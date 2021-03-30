import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { COLOR_BLUE_PRIMARY, COLOR_WHITE } from '../../styles/colors';
import Card from '../../components/atoms/Card';
import Label, { LabelType } from '../../components/atoms/Label';
import ChatListElement from '../../components/molecules/ChatListElement';
import { Screens } from '../../utils/constants';
import { useSocketConnection } from '../../context/SocketSonnectionContext';
import IChat, { ChatType } from '../../models/chat/Chat';
import { useIsFocused } from '@react-navigation/native';
import { MessageType } from '../../models/chat/message/Message';

const ChatScreen = ({ navigation }: { navigation: any }) => {
    const [chatList, setChatList] = useState<Array<IChat>>([]);

    const socketConnection = useSocketConnection();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && socketConnection) {
            console.log('SWITCHED TO CHAT_LIST');

            socketConnection.chatConnection.getChats();
            socketConnection.chatConnection.setOnNewMessageHandler(_ => {
                socketConnection.chatConnection.getChats();
                console.log('CHAT_LIST_ON_NEW_MESSAGE');
            });
            socketConnection.chatConnection.setOnGetChatsHandler(response => {
                if (response.success && response.response && response.response.chats) {
                    setChatList(response.response.chats);
                }
            });
        }
    }, [isFocused]);

    useEffect(() => {
        if (socketConnection) {
            // socketConnection.chatConnection.connect();
            socketConnection.chatConnection.setOnConnectHandler(() => {
                console.log('CONNECT');
            });
            socketConnection.chatConnection.createPrivateChat({ users: ['x3noku', 'x2noku'] });
            /*socketConnection.chatConnection.setOnCreatePrivateChatHandler(response =>
                console.log('CREATE CHAT', response),
            );*/
            socketConnection.chatConnection.sendMessage({
                chatId: '6062d3af11b7cc0013c98a8a',
                body: 'Мое первое сообщние для хриноку',
                type: MessageType.string,
            });
            socketConnection.chatConnection.setOnSendMessageHandler(response => console.log('SEND MESSAGE', response));
        }
    }, []);

    const renderItem = (chat: IChat) => {
        const author = chat.lastMessage.isOwned
            ? chat.users.find(user => user.login !== chat.lastMessage.author.login)
            : chat.users.find(user => user.login === chat.lastMessage.author.login);

        return (
            <ChatListElement
                key={chat.chatId}
                avatar={require('../../assets/images/avatar_debug.png')}
                name={chat.type === ChatType.private ? author?.username : chat.title}
                isOnline={true /*item.isOnline*/}
                lastMessage={chat.lastMessage}
                onPress={() => navigation.navigate(Screens.stacks.chatDirect, { chat: chat })}
            />
        );
    };

    return (
        <View style={styles.screen__container}>
            <Label
                type={[LabelType.Large, LabelType.Bold]}
                text='Сообщения'
                textStyle={styles.screen__contentTitle_style_text}
                containerStyle={styles.screen__contentTitle_style_container}
            />
            <Card style={styles.screen__content}>
                <FlatList
                    data={chatList}
                    keyExtractor={chat => chat.chatId}
                    renderItem={({ item: chat }: { item: IChat }) => renderItem(chat)}
                    style={styles.screen__contentBody}
                    contentContainerStyle={chatList.length === 0 && { flex: 1 }}
                    ListEmptyComponent={
                        <View
                            key='ListEmptyComponent'
                            style={{
                                flex: 1,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={require('../../assets/images/no_chats.png')}
                                style={{
                                    width: 216,
                                    resizeMode: 'contain',
                                }}
                            />
                        </View>
                    }
                />
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
    screen__content: {
        flexGrow: 1,
        height: 'auto',
        overflow: 'hidden',
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
    },
    screen__contentTitle_style_text: {
        color: COLOR_WHITE,
    },
    screen__contentTitle_style_container: {
        marginStart: 16,
        marginTop: 12,
        marginBottom: 12,
    },
    screen__contentBody: {
        marginTop: 36,
        flex: 1,
    },
});

export default ChatScreen;
