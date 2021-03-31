import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    NativeSyntheticEvent,
    StyleSheet,
    TextInput,
    TextInputSubmitEditingEventData,
    View,
} from 'react-native';
import { COLOR_TEXT_PRIMARY, COLOR_TEXT_SECONDARY } from '../../styles/colors';
import { SIZE_TEXT_HINT, SIZE_TEXT_PRIMARY, SIZE_TEXT_SECONDARY } from '../../styles/sizes';
import { ANIMATION_DURATION_VERY_SHORT } from '../../styles/animations';

export interface ITextInputWithLabelProp {
    value?: string;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    readonly?: boolean;
    blurOnSubmit?: boolean;
    onSubmitEditing?: (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
    onLayout?: () => void;
    containerStyle?: any;
    onFocus?: () => void;
}

const TextInputWithLabel: React.FC<ITextInputWithLabelProp> = props => {
    const {
        value,
        placeholder,
        onChangeText,
        secureTextEntry,
        blurOnSubmit,
        onSubmitEditing,
        onLayout,
        containerStyle,
        onFocus,
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState('');
    const labelDeviation = useRef(new Animated.Value(text === '' ? 0 : 1)).current;

    useEffect(() => {
        Animated.timing(labelDeviation, {
            useNativeDriver: false,
            toValue: isFocused || text !== '' || (value !== undefined && value !== '') ? 1 : 0,
            duration: ANIMATION_DURATION_VERY_SHORT,
        }).start();
    }, [isFocused, text]);

    return (
        <View style={[styles.textInput__container, containerStyle]} onLayout={onLayout}>
            <Animated.Text
                style={[
                    styles.textInput__label,
                    {
                        marginTop: labelDeviation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [styles.textInput__input.fontSize, -styles.textInput__input.paddingBottom],
                        }),
                        fontSize: labelDeviation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [SIZE_TEXT_SECONDARY, SIZE_TEXT_HINT],
                        }),
                    },
                ]}
            >
                {placeholder}
            </Animated.Text>
            <TextInput
                style={styles.textInput__input}
                value={value ? value : text}
                onChangeText={value => {
                    setText(value);
                    onChangeText?.(value);
                }}
                onFocus={() => {
                    setIsFocused(true);
                    onFocus?.();
                }}
                onBlur={() => setIsFocused(false)}
                secureTextEntry={secureTextEntry}
                blurOnSubmit={blurOnSubmit !== undefined ? blurOnSubmit : true}
                multiline={true}
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput__container: {
        width: 128,
    },
    textInput__label: {
        position: 'absolute',
        color: COLOR_TEXT_SECONDARY,
        paddingStart: 0,
        paddingTop: 2,
        paddingBottom: 2,
    },
    textInput__input: {
        minHeight: SIZE_TEXT_PRIMARY * 2.5,
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
