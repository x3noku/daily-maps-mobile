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
import Card from '../components/atoms/Card';
import Label, { LabelType } from '../components/atoms/Label';
import { COLOR_TEXT_ACCENT, COLOR_TEXT_SECONDARY, WHITE } from '../styles/colors';
import Button, { ButtonType } from '../components/atoms/Button';
import PressableLabel from '../components/atoms/PressableLabel';
import TextInputWithLabel from '../components/atoms/TextInputWithLabel';
import { SIZE_TEXT_TITLE } from '../styles/sizes';
import { ANIMATION_DURATION_SHORT } from '../styles/animations';

const RegisterScreen = () => {
    const keyboardOpened = useRef(new Animated.Value(0)).current;

    const keyboardDidShowListener = () => {
        Animated.timing(keyboardOpened, {
            useNativeDriver: false,
            duration: ANIMATION_DURATION_SHORT,
            toValue: 1,
        }).start();
    };
    const keyboardDidHideListener = () => {
        Animated.timing(keyboardOpened, {
            useNativeDriver: false,
            duration: ANIMATION_DURATION_SHORT,
            toValue: 0,
        }).start();
    };

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShowListener);
        Keyboard.addListener('keyboardDidHide', keyboardDidHideListener);

        return () => {
            Keyboard.addListener('keyboardDidShow', keyboardDidShowListener);
            Keyboard.addListener('keyboardDidHide', keyboardDidHideListener);
        };
    }, []);

    return (
        <View style={styles.screen__container}>
            <Image source={require('../assets/images/AuthCoverBackground.png')} style={styles.screen__cover} />
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
                                />
                                <TextInputWithLabel
                                    placeholder='Phone number'
                                    containerStyle={styles.screen__contentBodyCredentialsElement}
                                />
                                <TextInputWithLabel
                                    placeholder='Email'
                                    containerStyle={styles.screen__contentBodyCredentialsElement}
                                />
                                <TextInputWithLabel
                                    placeholder='Password'
                                    containerStyle={styles.screen__contentBodyCredentialsElement}
                                />
                            </View>
                            <Button
                                type={ButtonType.Contained}
                                text='Войти'
                                containerStyle={styles.screen__contentBodyButton}
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
    },
    screen__cover: {
        position: 'absolute',
        minHeight: '100%',
        width: '100%',
        marginTop: '-10%',
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
        marginTop: '2%',
        marginStart: '1%',
    },
    screen__contentTitle_style_text: {
        color: WHITE,
    },
    screen__contentBody: {
        minHeight: '65%',
        height: 'auto',
        justifyContent: 'space-between',
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
        width: '85%',
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
        width: '70%',
        maxWidth: 256,
    },
    screen__contentBodyElement: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
});

export default RegisterScreen;
