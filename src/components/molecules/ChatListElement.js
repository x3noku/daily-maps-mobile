import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { COLOR_BLUE_ACCENT, COLOR_BLUE_PRIMARY, COLOR_TEXT_SECONDARY, COLOR_WHITE } from '../../styles/colors';
import Label, { LabelType } from '../atoms/Label';
import { ripple } from '../../utils';

/*
 * PROPS
 * avatar: source
 * name: string
 * lastMessage: {text: string, date: date | long | string}

 * isOnline: boolean
 * */
const ChatListElement = props => {
    const { avatar, name, isOnline, lastMessage } = props;

    return (
        <Pressable
            onPress={() => console.log('click' + name)}
            android_ripple={{ color: ripple(COLOR_TEXT_SECONDARY) }}
            style={styles.element__container}
        >
            <View style={styles.element__avatarWrapper}>
                <Image source={avatar} style={styles.element__avatar} />
                <View style={styles.element__onlineOuterLayer}>
                    <View
                        style={[
                            styles.element__onlineInnerLayer,
                            { backgroundColor: isOnline ? COLOR_BLUE_PRIMARY : COLOR_TEXT_SECONDARY },
                        ]}
                    />
                </View>
            </View>
            <View style={{ width: 8 }} />
            <View style={styles.element__nameAndMessageBlock}>
                <Label
                    type={[LabelType.Medium, LabelType.Bold]}
                    text={name}
                    containerStyle={{ paddingTop: 0, paddingBottom: 0 }}
                />
                <Label
                    type={[LabelType.Small, LabelType.Bold]}
                    text={lastMessage.text}
                    textStyle={{ color: COLOR_TEXT_SECONDARY }}
                    containerStyle={{ paddingTop: 0, paddingBottom: 6 }}
                />
            </View>
            <View style={styles.element__time}>
                <Label type={[LabelType.Small]} text={lastMessage.date} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    element__container: {
        width: '100%',
        height: 68,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        paddingStart: 16,
        paddingEnd: 16,
    },
    element__avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
    },
    element__avatarWrapper: {
        width: 48,
        height: 48,
    },
    element__onlineOuterLayer: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: 6,
        right: 0,
        bottom: 0,
        backgroundColor: COLOR_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    element__onlineInnerLayer: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    element__nameAndMessageBlock: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    element__time: {
        paddingTop: 8,
        flex: 1,
        alignSelf: 'flex-start',
        alignItems: 'flex-end',
    },
});

export default ChatListElement;
