import React from 'react';
import { Pressable, View, Text, StyleSheet, StyleProp } from 'react-native';
import { COLOR_WHITE, COLOR_BLUE_PRIMARY, COLOR_BLUE_SECONDARY } from '../../styles/colors';
import { SIZE_TEXT_PRIMARY } from '../../styles/sizes';
import { ripple } from '../../utils';

export interface IButtonProp {
    text?: string;
    type: ButtonType;
    onPress?: (event: Event) => void;
    onLongPress?: (event: Event) => void;
    onPressIn?: (event: Event) => void;
    onPressOut?: (event: Event) => void;
    textStyles?: StyleProp<any> | Array<StyleProp<any>>;
    containerStyles?: StyleProp<any> | Array<StyleProp<any>>;
    rippleActive?: boolean;
}

export enum ButtonType {
    Contained,
    Outlined,
    Text,
}

const Button: React.FC<IButtonProp> = props => {
    const {
        text,
        type,
        onPress,
        onLongPress,
        onPressIn,
        onPressOut,
        textStyles,
        containerStyles,
        rippleActive,
    } = props;
    const textStyle: StyleProp<any> = textStyles instanceof Array ? Object.assign({}, ...textStyles) : textStyles;
    const containerStyle: StyleProp<any> =
        containerStyles instanceof Array ? Object.assign({}, ...containerStyles) : containerStyles;

    let typedStyle: StyleProp<any> = null;
    let rippleColor: any = null;
    switch (type) {
        case ButtonType.Contained:
            typedStyle = styles.button__container_type_contained;
            rippleColor = ripple(
                containerStyle?.backgroundColor !== undefined
                    ? containerStyle.backgroundColor
                    : styles.button__wrapper.backgroundColor,
            );
            break;
        case ButtonType.Outlined:
            typedStyle = styles.button__container_type_outlined;
            rippleColor = ripple(
                containerStyle?.borderColor !== undefined
                    ? containerStyle.borderColor
                    : styles.button__wrapper.borderColor,
            );
            break;
        case ButtonType.Text:
            typedStyle = styles.button__container_type_text;
            rippleColor = ripple(textStyle?.color !== undefined ? textStyle.color : COLOR_BLUE_SECONDARY);
            break;
    }

    return (
        <View style={[styles.button__wrapper, containerStyle, typedStyle]}>
            <Pressable
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                android_ripple={rippleActive ? { color: rippleColor } : {}}
                style={[
                    styles.button__container,
                    { borderRadius: styles.button__wrapper.borderRadius },
                    containerStyle !== undefined && Object.keys(containerStyle).includes('width')
                        ? { width: '100%' }
                        : {},
                ]}
            >
                <Text
                    style={[
                        styles.button__text,
                        { color: type === ButtonType.Contained ? COLOR_WHITE : COLOR_BLUE_SECONDARY },
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
        alignSelf: 'baseline',

        backgroundColor: COLOR_BLUE_PRIMARY,
        borderColor: COLOR_BLUE_SECONDARY,
        borderWidth: 2,
    },
    button__container: {
        paddingLeft: 32,
        paddingTop: 12,
        paddingRight: 32,
        paddingBottom: 12,
        justifyContent: 'center',
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
