import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import { COLOR_TEXT_PRIMARY, COLOR_TEXT_SECONDARY } from '../../styles/colors';
import { SIZE_TEXT_PRIMARY } from '../../styles/sizes';
import Label, { LabelType } from './Label';

export type IFloatingLabelInput = {
    placeholder?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    containerStyle?: any;
};

const TextInputWithLabel: React.FC<IFloatingLabelInput> = props => {
    const { placeholder, onChangeText, secureTextEntry, containerStyle } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState('');
    const [labelWidth, setLabelWidth] = useState(0);
    const labelDeviation = useRef(new Animated.Value(text === '' ? 0 : 1)).current;

    useEffect(() => {
        Animated.timing(labelDeviation, {
            useNativeDriver: false,
            toValue: isFocused || text !== '' ? 1 : 0,
            duration: 200,
        }).start();
    }, [isFocused, text]);

    return (
        <View style={[styles.textInput__container, containerStyle, { minWidth: labelWidth }]}>
            <Animated.View
                style={[
                    styles.textInput__labelWrapper,
                    {
                        marginTop: labelDeviation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [styles.textInput__input.fontSize, -styles.textInput__input.paddingBottom],
                        }),
                    },
                ]}
                onLayout={event => setLabelWidth(event.nativeEvent.layout.width)}
            >
                <Label
                    type={LabelType.Small}
                    text={placeholder}
                    textStyle={styles.textInput__label}
                    containerStyle={styles.textInput__label}
                />
            </Animated.View>
            <TextInput
                style={styles.textInput__input}
                secureTextEntry={secureTextEntry}
                onChangeText={value => {
                    setText(value);
                    onChangeText?.(value);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                blurOnSubmit
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput__container: {
        width: 128,
    },
    textInput__labelWrapper: {
        position: 'absolute',
        marginLeft: 0,
    },
    textInput__label: {
        color: COLOR_TEXT_SECONDARY,
        paddingStart: 0,
    },
    textInput__input: {
        paddingStart: 0,
        paddingBottom: 4,
        paddingEnd: 0,
        fontSize: SIZE_TEXT_PRIMARY,
        color: COLOR_TEXT_PRIMARY,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_TEXT_SECONDARY,
    },
});

export default TextInputWithLabel;
