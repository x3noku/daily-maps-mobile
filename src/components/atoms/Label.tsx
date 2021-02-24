import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOR_TEXT_PRIMARY } from '../../styles/colors';
import {
    SIZE_TEXT_ACCENT,
    SIZE_TEXT_HINT,
    SIZE_TEXT_PRIMARY,
    SIZE_TEXT_SECONDARY,
    SIZE_TEXT_TITLE,
} from '../../styles/sizes';

export interface ILabelProp {
    text?: string;
    type: LabelType | LabelType[];
    textStyle?: any;
    containerStyle?: any;
}

export enum LabelType {
    Underlined,
    Bold,
    Little,
    Small,
    Medium,
    Big,
    Large,
}

const Label: React.FC<ILabelProp> = props => {
    const { text, type, textStyle, containerStyle } = props;

    const typedStyle: any[] = [];

    const types = type instanceof Array ? type : [type];
    types.forEach(it => {
        switch (it) {
            case LabelType.Underlined:
                typedStyle.push(styles.label__text_type_underlined);
                break;
            case LabelType.Bold:
                typedStyle.push(styles.label__text_type_bold);
                break;
            case LabelType.Large:
                typedStyle.push(styles.label__text_type_large);
                break;
            case LabelType.Big:
                typedStyle.push(styles.label__text_type_big);
                break;
            case LabelType.Medium:
                typedStyle.push(styles.label__text_type_medium);
                break;
            case LabelType.Small:
                typedStyle.push(styles.label__text_type_small);
                break;
            case LabelType.Little:
                typedStyle.push(styles.label__text_type_little);
                break;
        }
    });

    return (
        <View style={[styles.label__container, containerStyle]}>
            <Text style={[styles.label__text, textStyle, ...typedStyle]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    label__container: {
        paddingLeft: 6,
        paddingTop: 2,
        paddingRight: 6,
        paddingBottom: 2,
        justifyContent: 'center',
    },
    label__text: {
        color: COLOR_TEXT_PRIMARY,
        fontSize: SIZE_TEXT_PRIMARY,
    },
    label__text_type_underlined: {
        textDecorationLine: 'underline',
    },
    label__text_type_bold: {
        fontWeight: 'bold',
    },
    label__text_type_large: {
        fontSize: SIZE_TEXT_TITLE,
    },
    label__text_type_big: {
        fontSize: SIZE_TEXT_ACCENT,
    },
    label__text_type_medium: {
        fontSize: SIZE_TEXT_PRIMARY,
    },
    label__text_type_small: {
        fontSize: SIZE_TEXT_SECONDARY,
    },
    label__text_type_little: {
        fontSize: SIZE_TEXT_HINT,
    },
});

export default Label;
