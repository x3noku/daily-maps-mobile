import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { COLOR_TEXT_PRIMARY } from '../../styles/colors';
import { ripple } from '../../utils';
import Label, { ILabelProp, LabelType as PressableLabelType } from './Label';

export interface IPressableLabelProp extends ILabelProp {
    onPress?: (event: Event) => void;
    onLongPress?: (event: Event) => void;
    onPressIn?: (event: Event) => void;
    onPressOut?: (event: Event) => void;
    rippleActive?: boolean;
}

export { PressableLabelType };

const PressableLabel: React.FC<IPressableLabelProp> = props => {
    const { text, type, onPress, onLongPress, onPressIn, onPressOut, textStyle, containerStyle, rippleActive } = props;

    const rippleColor = rippleActive
        ? ripple(textStyle?.color !== undefined ? textStyle.color : styles.pressableLabel__text.color)
        : undefined;

    return (
        <View style={styles.pressableLabel__wrapper}>
            <Pressable
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                android_ripple={{ color: rippleColor }}
                style={[containerStyle, { borderRadius: styles.pressableLabel__wrapper.borderRadius }]}
            >
                <Label
                    type={type}
                    text={text}
                    textStyle={[styles.pressableLabel__text, textStyle]}
                    containerStyle={containerStyle}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    pressableLabel__wrapper: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    pressableLabel__text: {
        color: COLOR_TEXT_PRIMARY,
    },
});

export default PressableLabel;
