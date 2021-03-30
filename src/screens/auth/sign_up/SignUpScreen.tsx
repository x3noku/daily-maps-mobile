import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Card from '../../../components/atoms/Card';
import Label, { LabelType } from '../../../components/atoms/Label';
import { COLOR_TEXT_ACCENT, COLOR_TEXT_SECONDARY, COLOR_WHITE } from '../../../styles/colors';
import Button, { ButtonType } from '../../../components/atoms/Button';
import PressableLabel from '../../../components/atoms/PressableLabel';
import TextInputWithLabel from '../../../components/atoms/TextInputWithLabel';
import { SIZE_TEXT_TITLE } from '../../../styles/sizes';
import { ANIMATION_DURATION_SHORT } from '../../../styles/animations';
import { useKeyboardHide, useKeyboardShow } from '../../../utils/hooks';
import { Screens } from '../../../utils/constants';
import { useCredentialsData, useSignUp } from './SignUp.hooks';
import { saveToken } from '../../../utils/storage';
import { getRootHeightPercents, getRootWidthPercents } from '../../../utils';

const SignUpScreen = ({ navigation }: { navigation: any }) => {
    const keyboardOpened = useRef(new Animated.Value(0)).current;
    useKeyboardShow(() => {
        Animated.timing(keyboardOpened, {
            useNativeDriver: false,
            duration: ANIMATION_DURATION_SHORT,
            toValue: 1,
        }).start();
    });
    useKeyboardHide(() => {
        Animated.timing(keyboardOpened, {
            useNativeDriver: false,
            duration: ANIMATION_DURATION_SHORT,
            toValue: 0,
        }).start();
    });

    const { isLoading, token, errors, signUp } = useSignUp();
    const { username, email, login, password, setUsername, setEmail, setLogin, setPassword } = useCredentialsData();

    useEffect(() => {
        if (token !== null && errors === null) {
            saveToken(token);
        }
    }, [token]);

    return (
        <View style={styles.screen__container}>
            <Image source={require('../../../assets/images/AuthCoverBackground.png')} style={styles.screen__cover} />
            <KeyboardAvoidingView style={styles.screen__contentWrapper}>
                <TouchableWithoutFeedback style={styles.screen__contentWrapper} onPress={Keyboard.dismiss}>
                    <View style={styles.screen__content}>
                        <Animated.View
                            style={[
                                styles.screen__contentTitle_style_container,
                                {
                                    marginTop: keyboardOpened.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [Dimensions.get('window').height / 100, -SIZE_TEXT_TITLE],
                                    }),
                                    opacity: keyboardOpened.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 0],
                                    }),
                                },
                            ]}
                        >
                            <Label
                                type={[LabelType.Large, LabelType.Bold]}
                                text='Evently'
                                textStyle={styles.screen__contentTitle_style_text}
                            />
                        </Animated.View>
                        <Card style={styles.screen__contentBody}>
                            <Label
                                type={[LabelType.Large, LabelType.Bold]}
                                text='Регистрация'
                                containerStyle={[styles.screen__contentBodyTitle, styles.screen__contentBodyElement]}
                            />
                            <View style={[styles.screen__contentBodyCredentials, styles.screen__contentBodyElement]}>
                                <TextInputWithLabel
                                    placeholder='Login'
                                    containerStyle={styles.screen__contentBodyCredentialsElement}
                                    onChangeText={setLogin}
                                />
                                {/* TODO: CHANGE TO PHONE NUMBER */}
                                <TextInputWithLabel
                                    placeholder='Username'
                                    containerStyle={styles.screen__contentBodyCredentialsElement}
                                    onChangeText={setUsername}
                                />
                                <TextInputWithLabel
                                    placeholder='Email'
                                    containerStyle={styles.screen__contentBodyCredentialsElement}
                                    onChangeText={setEmail}
                                />
                                <TextInputWithLabel
                                    placeholder='Password'
                                    containerStyle={styles.screen__contentBodyCredentialsElement}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                            </View>
                            <Button
                                type={ButtonType.Contained}
                                text='Зарегистрироваться'
                                containerStyles={[styles.screen__contentBodyButton, styles.screen__contentBodyElement]}
                                onPress={() => {
                                    signUp(username, email, login, password);
                                }}
                                rippleActive
                            />
                            <View style={[styles.screen__contentBodyLogin, styles.screen__contentBodyElement]}>
                                <Label
                                    type={[LabelType.Small]}
                                    text='Уже есть аккаунт?'
                                    textStyle={styles.screen__contentBodyLoginPrimary}
                                    containerStyle={styles.screen__contentBodyLoginPrimary}
                                />
                                <PressableLabel
                                    type={[LabelType.Small]}
                                    text='Войти'
                                    textStyle={styles.screen__contentBodyLoginAccent}
                                    onPress={() => {
                                        navigation.navigate(Screens.auth.signIn);
                                    }}
                                    rippleActive
                                />
                            </View>
                        </Card>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen__container: {
        flex: 1,
        width: getRootWidthPercents(100),
        height: getRootHeightPercents(100),
    },
    screen__cover: {
        position: 'absolute',
        minHeight: getRootHeightPercents(100),
        width: getRootWidthPercents(100),
        marginTop: getRootHeightPercents(-5),
    },
    screen__contentWrapper: {
        flex: 1,
    },
    screen__content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    screen__contentTitle_style_container: {
        marginTop: getRootHeightPercents(2),
        marginStart: getRootWidthPercents(1),
    },
    screen__contentTitle_style_text: {
        color: COLOR_WHITE,
    },
    screen__contentBody: {
        minHeight: getRootHeightPercents(65),
        height: 'auto',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingStart: 24,
        paddingTop: 36,
        paddingEnd: 24,
        paddingBottom: 36,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
    },
    screen__contentBodyTitle: {
        alignSelf: 'flex-start',
    },
    screen__contentBodyCredentials: {
        justifyContent: 'space-between',
        width: getRootWidthPercents(75),
        maxWidth: 320,
    },
    screen__contentBodyCredentialsElement: {
        marginTop: 4,
        marginBottom: 4,
        width: '100%',
    },
    screen__contentBodyLogin: {
        flexDirection: 'row',
    },
    screen__contentBodyLoginPrimary: {
        color: COLOR_TEXT_SECONDARY,
        paddingRight: 0,
    },
    screen__contentBodyLoginAccent: {
        color: COLOR_TEXT_ACCENT,
    },
    screen__contentBodyButton: {
        alignSelf: 'center',
        width: getRootWidthPercents(65),
        maxWidth: 256,
    },
    screen__contentBodyElement: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
});

export default SignUpScreen;
