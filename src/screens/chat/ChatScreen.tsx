import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {useChatConnection} from "../../context/SocketConnection";

const ChatScreen = () => {
    const { createPrivateChat, } = useChatConnection();

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableHighlight onPress={() => {createPrivateChat()}}>
                <Text>Chat Screen</Text>
            </TouchableHighlight>
        </View>
    )
};

export default ChatScreen;
