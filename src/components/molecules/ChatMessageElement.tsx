import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_BLUE_PRIMARY, COLOR_GRAY, COLOR_TEXT_DARK, COLOR_WHITE } from '../../styles/colors';
import { SIZE_TEXT_PRIMARY, SIZE_TEXT_SECONDARY } from '../../styles/sizes';
import Space, { SpaceType } from '../atoms/Space';

export interface IChatMessageElementProp {
    text: string;
    owned: boolean;
    date: string;
}

const ChatMessageElement: React.FC<IChatMessageElementProp> = props => {
    const { text, owned, date } = props;

    return (
        <View
            style={[
                styles.element__container,
                {
                    backgroundColor: owned ? COLOR_BLUE_PRIMARY : COLOR_GRAY,
                    flexDirection: owned ? 'column' : 'column-reverse',
                },
            ]}
        >
            <Text
                style={[
                    styles.element__text,
                    {
                        color: owned ? COLOR_WHITE : COLOR_TEXT_DARK,
                    },
                ]}
            >
                {text}
            </Text>
            <Space type={SpaceType.XXLittle} />
            <Text
                style={[
                    styles.element__time,
                    {
                        color: owned ? COLOR_WHITE : COLOR_TEXT_DARK,
                    },
                ]}
            >
                {date}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    element__container: {
        marginStart: 24,
        marginEnd: 24,
        width: '75%',
        height: 'auto',
        borderRadius: 16,
        padding: 8,
    },
    element__time: {
        fontSize: SIZE_TEXT_SECONDARY,
        alignSelf: 'flex-end',
    },
    element__text: {
        fontSize: SIZE_TEXT_PRIMARY,
    },
});

export default ChatMessageElement;
