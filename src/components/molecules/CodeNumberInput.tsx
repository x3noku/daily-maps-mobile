import React, { ReactElement, useState } from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLOR_BLUE_ACCENT } from '../../styles/colors';

interface ICodeNumberKeyProp {
    value?: string;
    onPress?: (event: GestureResponderEvent) => void;
}

const CodeNumberKey: React.FC<ICodeNumberKeyProp> = props => {
    const { value, onPress } = props;

    return (
        <Pressable style={styles.codeKey__wrapper} onPress={onPress}>
            <View style={styles.codeKey__container}>
                <Text style={styles.codeKey__text}>{value !== undefined ? value : '_'}</Text>
            </View>
        </Pressable>
    );
};

export interface ICodeNumberInputProp {
    length: number;
    onChangeValue?: (value: string) => void;
}

const CodeNumberInput: React.FC<ICodeNumberInputProp> = props => {
    const { length, onChangeValue } = props;

    const [invisibleInput, setInvisibleInput] = useState<TextInput | null>();
    const [code, setCode] = useState('');

    const keys: Array<ReactElement> = [];
    for (let i = 0; i < length; i++) {
        keys.push(
            <CodeNumberKey
                key={i}
                value={code[i]}
                onPress={() => {
                    invisibleInput?.blur();
                    invisibleInput?.focus();
                }}
            />,
        );
    }

    return (
        <View style={styles.code__container}>
            {keys}
            <TextInput
                ref={setInvisibleInput}
                style={styles.code__input}
                value={code}
                onChangeText={text => {
                    setCode(text.replace(/[^0-9]/g, ''));
                    onChangeValue?.(code);
                }}
                maxLength={length}
                keyboardType='phone-pad'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    code__container: {
        flexDirection: 'row',
    },
    code__input: {
        position: 'absolute',
        opacity: 0,
        height: 0,
        width: 0,
    },
    codeKey__wrapper: {
        backgroundColor: '#E8E5F6',
        borderRadius: 8,
        height: 58,
        width: 52,
        marginStart: 4,
        marginEnd: 4,
    },
    codeKey__container: {
        backgroundColor: '#F5F8FA',
        borderRadius: 8,
        height: 54,
        width: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeKey__text: {
        color: COLOR_BLUE_ACCENT,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CodeNumberInput;
