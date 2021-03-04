import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View, Text, TextInput } from 'react-native';
import { UserInfo } from './ChatListScreen';
import Card from '../components/atoms/Card';
import { COLOR_BLUE_PRIMARY, COLOR_GRAY, COLOR_TEXT_SECONDARY, COLOR_WHITE } from '../styles/colors';
import Label, { LabelType } from '../components/atoms/Label';
import { SIZE_TEXT_PRIMARY } from '../styles/sizes';
import ChatMessageElement from '../components/molecules/ChatMessageElement';
import Space, { SpaceType } from '../components/atoms/Space';

export interface IDirectScreenChatProp {
    userInfo: UserInfo;
}

type Message = {
    text: string;
    owned: boolean;
    time: string;
};

const messages: Array<Message> = [
    {
        text: 'Vivamus finibus sollicitudin lorem eu hendrerit. Suspendisse luctus ornare aliquet.',
        owned: true,
        time: '10:45 AM',
    },
    {
        text:
            'Proin aliquam nisi eget lorem varius ornare. Nam sed neque ut est consequat eleifend. Proin scelerisque tempor eleifend. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur sed arcu a nunc dignissim pretium eget a est. Maecenas non dignissim sem. Duis congue magna magna, sed bibendum eros vehicula vel.',
        owned: false,
        time: '10:40 AM',
    },
    {
        text: 'Vivamus finibus sollicitudin lorem eu hendrerit. Suspendisse luctus ornare aliquet.',
        owned: false,
        time: '10:35 AM',
    },
    {
        text: 'Vivamus finibus sollicitudin lorem eu hendrerit. Suspendisse luctus ornare aliquet.',
        owned: false,
        time: '10:35 AM',
    },
    {
        text: 'Vivamus finibus sollicitudin lorem eu hendrerit. Suspendisse luctus ornare aliquet.',
        owned: true,
        time: '9:35 AM',
    },
    {
        text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elementum justo tortor, ut lobortis odio feugiat et. Fusce feugiat eros non quam fermentum accumsan. Fusce pulvinar eros sit amet dui finibus, id maximus ex convallis.',
        owned: true,
        time: '9:35 AM',
    },
];

const DirectChatScreen: React.FC<IDirectScreenChatProp> = props => {
    const { name, avatar, isOnline } = props.userInfo;
    const [inputHeight, setInputHeight] = useState<number | undefined>(undefined);

    const renderItem = (item: Message) => (
        <View style={{ width: '100%', alignItems: item.owned ? 'flex-end' : 'flex-start' }}>
            <ChatMessageElement text={item.text} owned={item.owned} date={item.time} />
        </View>
    );

    return (
        <View style={styles.screen__container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/images/back.png')} style={styles.screen__back} />
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
                <Label
                    type={[LabelType.Large, LabelType.Bold]}
                    text={name}
                    textStyle={{ color: COLOR_WHITE }}
                    containerStyle={{ marginStart: 8, marginTop: 12, marginBottom: 12 }}
                />
            </View>
            <Card style={styles.screen__content}>
                <FlatList
                    inverted
                    data={messages}
                    keyExtractor={(_, index) => index + ''}
                    renderItem={({ item }) => renderItem(item)}
                    ItemSeparatorComponent={() => <Space type={SpaceType.Medium} />}
                    style={{ marginTop: 36, flex: 1 }}
                    ListHeaderComponent={<Space type={SpaceType.Big} />}
                />
                <View
                    style={{
                        height: 'auto',
                        backgroundColor: COLOR_GRAY,
                        marginStart: 8,
                        marginEnd: 8,
                        marginBottom: 12,
                        borderRadius: 26,
                        overflow: 'hidden',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingStart: 12,
                        paddingEnd: 12,
                    }}
                >
                    <Image source={require('../assets/images/attach_icon.png')} style={{ width: 24, height: 24 }} />
                    <View style={{ width: 8 }} />
                    <TextInput
                        style={{ flexGrow: 1, height: inputHeight, fontSize: SIZE_TEXT_PRIMARY }}
                        placeholder='Type a message'
                        multiline
                        onContentSizeChange={event => {
                            if (inputHeight === undefined) setInputHeight(event.nativeEvent.contentSize.height);
                            else if (event.nativeEvent.contentSize.height < SIZE_TEXT_PRIMARY * 7) {
                                setInputHeight(event.nativeEvent.contentSize.height);
                            }
                        }}
                    />
                    <View style={{ width: 8 }} />
                    <Image source={require('../assets/images/Vector.png')} style={{ width: 24, height: 24 }} />
                    <View style={{ width: 8 }} />
                    <Image source={require('../assets/images/Group.png')} style={{ width: 24, height: 24 }} />
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen__container: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: COLOR_BLUE_PRIMARY,
    },
    screen__back: {
        width: 36,
        height: 36,
        marginStart: 12,
    },
    screen__content: {
        flexGrow: 1,
        flexDirection: 'column',
        height: 'auto',
        overflow: 'hidden',
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
    },
    element__avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    element__avatarWrapper: {
        width: 44,
        height: 44,
        marginStart: 12,
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
    textinput: {
        fontSize: SIZE_TEXT_PRIMARY,
    },
});

export default DirectChatScreen;
