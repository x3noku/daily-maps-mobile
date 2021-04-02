import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR_BLUE_PRIMARY, COLOR_TEXT_SECONDARY } from '../../styles/colors';
import { ripple } from '../../utils';

export interface IIconButtonProp {
    icon?: ImageSourcePropType;
    type: IconButtonType | IconButtonType[];
    onPress?: (event: Event) => void;
    onLongPress?: (event: Event) => void;
    onPressIn?: (event: Event) => void;
    onPressOut?: (event: Event) => void;
    iconStyles?: StyleProp<any> | Array<StyleProp<any>>;
    containerStyles?: StyleProp<any> | Array<StyleProp<any>>;
    rippleActive?: boolean;
}

export enum IconButtonType {
    Contained,
    Icon,
    Default,
    Small,
}

const IconButton: React.FC<IIconButtonProp> = props => {
    const {
        icon,
        type,
        onPress,
        onLongPress,
        onPressIn,
        onPressOut,
        iconStyles,
        containerStyles,
        rippleActive,
    } = props;
    const iconStyle: StyleProp<any> = iconStyles instanceof Array ? Object.assign({}, ...iconStyles) : iconStyles;
    const containerStyle: StyleProp<any> =
        containerStyles instanceof Array ? Object.assign({}, ...containerStyles) : containerStyles;

    let rippleColor: any = null;
    const typedStyle: Array<StyleProp<any>> = [];
    const types = type instanceof Array ? type : [type];
    types.forEach(it => {
        switch (it) {
            case IconButtonType.Contained:
                typedStyle.push(styles.button__container_type_contained);
                rippleColor = ripple(
                    containerStyle?.backgroundColor !== undefined
                        ? containerStyle.backgroundColor
                        : styles.button__wrapper.backgroundColor,
                );
                break;
            case IconButtonType.Icon:
                typedStyle.push(styles.button__container_type_icon);
                rippleColor = ripple(iconStyle?.color !== undefined ? iconStyle.color : COLOR_TEXT_SECONDARY);
                break;
            case IconButtonType.Default:
                typedStyle.push(styles.button__container_type_default);
                break;
            case IconButtonType.Small:
                typedStyle.push(styles.button__container_type_small);
                break;
        }
    });

    return (
        <View style={[styles.button__wrapper, containerStyle, ...typedStyle]}>
            <Pressable
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                android_ripple={rippleActive ? { color: rippleColor } : {}}
                style={[styles.button__container, { borderRadius: styles.button__wrapper.borderRadius }]}
            >
                {icon && <Image source={icon} style={[styles.button__icon, iconStyle]} />}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    button__wrapper: {
        overflow: 'hidden',
        borderRadius: 28,
        backgroundColor: COLOR_BLUE_PRIMARY,
    },
    button__container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    button__icon: {
        width: '64%',
        height: '64%',
        resizeMode: 'contain',
    },
    button__container_type_contained: {},
    button__container_type_icon: {
        backgroundColor: undefined,
    },
    button__container_type_default: {
        width: 48,
        height: 48,
    },
    button__container_type_small: {
        width: 36,
        height: 36,
    },
});

export default IconButton;
