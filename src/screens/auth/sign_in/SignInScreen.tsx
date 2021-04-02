import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Dimensions,
} from 'react-native';
import TextInputWithLabel from '../../../components/atoms/TextInputWithLabel';
import { ANIMATION_DURATION_SHORT } from '../../../styles/animations';
import Label, { LabelType } from '../../../components/atoms/Label';
import Card from '../../../components/atoms/Card';
import Button, { ButtonType } from '../../../components/atoms/Button';
import Space, { SpaceType } from '../../../components/atoms/Space';
import PressableLabel from '../../../components/atoms/PressableLabel';
import { SIZE_TEXT_TITLE } from '../../../styles/sizes';
import { COLOR_TEXT_SECONDARY, COLOR_WHITE } from '../../../styles/colors';
import { useKeyboardShow, useKeyboardHide } from '../../../utils/hooks';
import { Screens } from '../../../utils/constants';
import { useCredentialsData, useSignIn } from './SignIn.hooks';
import { saveToken } from '../../../utils/storage';
import { getRootHeightPercents, getRootWidthPercents } from '../../../utils';

const SignInScreen = ({ navigation }: { navigation: any }) => {
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

    const { isLoading, token, errors, signIn } = useSignIn();
    const { login, password, setLogin, setPassword } = useCredentialsData();

    useEffect(() => {
        if (token !== null && errors === null) {
            saveToken(token).then(() => {
                navigation.navigate(Screens.stacks.main, { screen: Screens.map });
            });
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
                                text='Вход'
                                containerStyle={[styles.screen__contentBodyTitle, styles.screen__contentBodyElement]}
                            />
                            <View style={[styles.screen__contentBodyCredentials, styles.screen__contentBodyElement]}>
                                <TextInputWithLabel
                                    placeholder='Email/Phone number'
                                    containerStyle={styles.screen__contentBodyCredentialsElement}
                                />
                                <TextInputWithLabel
                                    placeholder='Login'
                                    containerStyle={styles.screen__contentBodyCredentialsElement}
                                    onChangeText={setLogin}
                                />
                                <TextInputWithLabel
                                    placeholder='Password'
                                    containerStyle={styles.screen__contentBodyCredentialsElement}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                            </View>
                            <View style={styles.screen__contentBodyElement}>
                                <Button
                                    type={ButtonType.Contained}
                                    text='Войти'
                                    containerStyles={[
                                        styles.screen__contentBodyButton,
                                        styles.screen__contentBodyElement,
                                    ]}
                                    onPress={() => {
                                        signIn(login, password);
                                    }}
                                    rippleActive
                                />
                                <Space type={SpaceType.XXLittle} />
                                <PressableLabel
                                    type={[LabelType.Small, LabelType.Underlined]}
                                    text='Забыли пароль?'
                                    textStyle={styles.screen__contentBodyForgotPassword}
                                    rippleActive
                                />
                            </View>
                            <Button
                                type={ButtonType.Outlined}
                                text='Создать аккаунт'
                                containerStyles={[styles.screen__contentBodyButton, styles.screen__contentBodyElement]}
                                onPress={() => {
                                    navigation.navigate(Screens.auth.signUp);
                                }}
                                rippleActive
                            />
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
        paddingBottom: 24,
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
    screen__contentBodyForgotPassword: {
        color: COLOR_TEXT_SECONDARY,
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

export default SignInScreen;
