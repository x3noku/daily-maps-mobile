import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {useChatConnection} from "../../context/SocketConnection";

const ChatScreen = () => {
    const { createPrivateChat, getChats, sendMessage, getChatMessages, connectChat, connectChatMessage } = useChatConnection();
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableHighlight onPress={() => {createPrivateChat({users: ['yourdefault', 'xenous']})}}>
                <Text>Chat Screen</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {getChats()}}>
                <Text>Get Chats</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {getChatMessages({id: '604039c2928997a99bde3d46'})}}>
                <Text>Get Chats Messages</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {connectChat({id: '604039c2928997a99bde3d46'})}}>
                <Text>Connect chat</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {connectChatMessage()}}>
                <Text>Connect chat messages</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => sendMessage({
                message: 'You have a really nice dick',
                id: '604039c2928997a99bde3d46'
            })}
            >
                <Text>Chat Send Message</Text>
            </TouchableHighlight>
        </View>
    )
};

export default ChatScreen;
