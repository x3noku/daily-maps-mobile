import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { WHITE, BLUE_PRIMARY, BLUE_SECONDARY } from '../../styles/colors';
import { SIZE_TEXT_PRIMARY } from '../../styles/sizes';
import { ripple } from '../../utils';

export type IButtonProp = {
    text?: string;
    type: ButtonType;
    onPress?: (event: Event) => void;
    onLongPress?: (event: Event) => void;
    onPressIn?: (event: Event) => void;
    onPressOut?: (event: Event) => void;
    textStyle?: any;
    containerStyle?: any;
};

export enum ButtonType {
    Contained,
    Outlined,
    Text,
}

const Button: React.FC<IButtonProp> = props => {
    const { text, type, onPress, onLongPress, onPressIn, onPressOut, textStyle, containerStyle } = props;

    let typedStyle: any = null;
    let rippleColor: any = null;
    switch (type) {
        case ButtonType.Contained:
            typedStyle = styles.button__container_type_contained;
            rippleColor = ripple(
                containerStyle?.backgroundColor !== undefined
                    ? containerStyle.backgroundColor
                    : styles.button__container.backgroundColor,
            );
            break;
        case ButtonType.Outlined:
            typedStyle = styles.button__container_type_outlined;
            rippleColor = ripple(
                containerStyle?.borderColor !== undefined
                    ? containerStyle.borderColor
                    : styles.button__container.borderColor,
            );
            break;
        case ButtonType.Text:
            typedStyle = styles.button__container_type_text;
            rippleColor = ripple(textStyle?.color !== undefined ? textStyle.color : BLUE_SECONDARY);
            break;
    }

    return (
        <View style={styles.button__wrapper}>
            <Pressable
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                android_ripple={{ color: rippleColor }}
                style={[
                    styles.button__container,
                    containerStyle,
                    typedStyle,
                    { borderRadius: styles.button__wrapper.borderRadius },
                ]}
            >
                <Text
                    style={[
                        styles.button__text,
                        { color: type === ButtonType.Contained ? WHITE : BLUE_SECONDARY },
                        textStyle,
                    ]}
                >
                    {text}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    button__wrapper: {
        borderRadius: 15,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    button__container: {
        paddingLeft: 48,
        paddingTop: 12,
        paddingRight: 48,
        paddingBottom: 12,
        justifyContent: 'center',

        backgroundColor: BLUE_PRIMARY,
        borderColor: BLUE_SECONDARY,
        borderWidth: 2,
    },
    button__text: {
        fontSize: SIZE_TEXT_PRIMARY,
        textAlign: 'center',
    },
    button__container_type_contained: {
        borderColor: undefined,
        borderWidth: undefined,
    },
    button__container_type_outlined: {
        backgroundColor: undefined,
    },
    button__container_type_text: {
        backgroundColor: undefined,
        borderColor: undefined,
        borderWidth: undefined,
    },
});

export default Button;
