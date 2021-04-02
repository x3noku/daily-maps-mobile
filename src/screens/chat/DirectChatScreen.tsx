import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, TextInput, View } from "react-native";
import { COLOR_BLUE_PRIMARY, COLOR_GRAY, COLOR_WHITE } from "../../styles/colors";
import Label, { LabelType } from "../../components/atoms/Label";
import ChatMessageElement from "../../components/molecules/ChatMessageElement";
import Space, { SpaceType } from "../../components/atoms/Space";
import IChat from "../../models/chat/Chat";
import { useSocketConnection } from "../../context/SocketSonnectionContext";
import IMessage, { MessageType } from "../../models/chat/message/Message";
import IconButton, { IconButtonType } from "../../components/atoms/IconButton";
import Card from "../../components/atoms/Card";
import { SIZE_TEXT_PRIMARY } from "../../styles/sizes";
import { Screens } from "../../utils/constants";

const DirectChatScreen = ({ navigation, route }) => {
    const { chatId, type, title, lastMessage, users } = route.params.chat as IChat;
    const author = lastMessage.isOwned
        ? users.find(user => user.login !== lastMessage.author.login)
        : users.find(user => user.login === lastMessage.author.login);
    const [messages, setMessages] = useState<Array<IMessage>>([]);
    const [inputHeight, setInputHeight] = useState<number | undefined>(undefined);
    const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);
    const [messageBody, setMessageBody] = useState('');

    const socketConnection = useSocketConnection();
    
    socketConnection.chatConnection.getChatMessages({ chatId: chatId });
    socketConnection.chatConnection.setOnGetMessagesHandler(response => {
        if (response.success && response.response && response.response.messages) {
            if(messages.length === 0) {
                setMessages(response.response.messages);
            }
        }
    });
    socketConnection.chatConnection.setOnNewMessageHandler(response => {
        console.log('DIRECT_CHAT_ON_NEW_MESSAGE');
        if(response.success && response.response) {
            console.log('NEW_MESSAGE', response);
            console.log('ON NEW MESSAGE: MESSAGES LENGTH IS', messages.length);
            setMessages([...messages, response.response]);
        }
    });
    
    useEffect(() => {
        console.log('MESSAGES_LENGTH', messages.length);
    }, [messages])
    
    const renderItem = (message: IMessage) => (
        <View key={message.messageId} style={{ width: '100%', alignItems: message.isOwned ? 'flex-end' : 'flex-start' }}>
            <Space type={SpaceType.Default} />
            <ChatMessageElement text={message.body} owned={message.isOwned} date={message.date.toString()} />
        </View>
    );

    return (
        <View style={styles.screen__container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconButton type={[IconButtonType.Default, IconButtonType.Icon]} icon={require('../../assets/images/back.png')} containerStyles={styles.screen__back} onPress={() => navigation.goBack()}/>
                <View style={styles.element__avatarWrapper}>
                    <Image source={require('../../assets/images/avatar_debug.png')} style={styles.element__avatar}/>
                    <View style={styles.element__onlineOuterLayer}>
                        <View
                            style={[
                                styles.element__onlineInnerLayer,
                                { backgroundColor: COLOR_BLUE_PRIMARY },
                            ]}
                        />
                    </View>
                </View>
                <Label
                    type={[LabelType.Large, LabelType.Bold]}
                    text={author?.username}
                    textStyle={{ color: COLOR_WHITE }}
                    containerStyle={{ marginStart: 8, marginTop: 12, marginBottom: 12 }}
                />
            </View>
            <Card style={styles.screen__content}>
                <FlatList
                    inverted={true}
                    data={[...messages].reverse()}
                    keyExtractor={message => message.messageId}
                    renderItem={({ item: message }: { item: IMessage }) => renderItem(message)}
                    style={{ marginTop: 36, flex: 1 }}
                    ListHeaderComponent={<Space key='ListHeaderComponent' type={SpaceType.Big} />}
                />
                <View
                    style={{
                        height: 'auto',
                        width: 'auto',
                        backgroundColor: COLOR_GRAY,
                        marginStart: 8,
                        marginEnd: 8,
                        marginBottom: 12,
                        borderRadius: 26,
                        overflow: 'hidden',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingStart: 8,
                        paddingEnd: 8,
                    }}
                >
                    <IconButton type={[IconButtonType.Icon, IconButtonType.Small]} icon={require('../../assets/images/attach_icon.png')} rippleActive />
                    <TextInput
                        onLayout={event => setInputWidth(event.nativeEvent.layout.width)}
                        style={{ flexGrow: 1, maxWidth: inputWidth, height: inputHeight, fontSize: SIZE_TEXT_PRIMARY }}
                        placeholder='Type a message'
                        multiline
                        value={messageBody}
                        onContentSizeChange={event => {
                            if (inputHeight === undefined) setInputHeight(event.nativeEvent.contentSize.height);
                            else if (event.nativeEvent.contentSize.height < SIZE_TEXT_PRIMARY * 7) {
                                setInputHeight(event.nativeEvent.contentSize.height);
                            }
                        }}
                        onChangeText={setMessageBody}
                    />
                    <IconButton type={[IconButtonType.Icon, IconButtonType.Small]} icon={require('../../assets/images/Vector.png')} rippleActive />
                    <IconButton type={[IconButtonType.Icon, IconButtonType.Small]} icon={require('../../assets/images/send.png')} rippleActive onPress={() => {
                        if(socketConnection) {
                            socketConnection.chatConnection.sendMessage({
                                chatId: chatId,
                                type: MessageType.string,
                                body: messageBody
                            });
                            socketConnection.chatConnection.setOnSendMessageHandler(response => {
                                console.log('SEND_MESSAGE', response);
                            })
                            setMessageBody('')
                        }
                    }}/>
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
});

export default DirectChatScreen;
