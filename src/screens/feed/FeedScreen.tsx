import React from 'react';
import { Text, View } from 'react-native';
import { getToken } from '../../utils/storage';
import { useSocketConnection } from '../../context/SocketSonnectionContext';

const FeedScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed Screen</Text>
        </View>
    );
};

export default FeedScreen;
