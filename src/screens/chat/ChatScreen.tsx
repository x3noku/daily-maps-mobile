import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Dimensions, Image } from 'react-native';
import { COLOR_BLUE_PRIMARY, COLOR_WHITE } from '../../styles/colors';
import Card from '../../components/atoms/Card';
import Label, { LabelType } from '../../components/atoms/Label';
import ChatListElement from '../../components/molecules/ChatListElement';
import { Screens } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';

export type UserInfo = {
    name: string;
    isOnline: boolean;
    lastMessage: { text: string; date: string };
    avatar: any;
};

const ChatScreen = ({ navigation }: { navigation: any }) => {
    const [chatListData, setChatListData] = useState<Array<UserInfo>>([]);

    const renderItem = (item: UserInfo) => (
        <ChatListElement
            avatar={item.avatar}
            name={item.name}
            isOnline={item.isOnline}
            lastMessage={item.lastMessage}
            onPress={() => navigation.navigate(Screens.stacks.chatDirect, { userInfo: item })}
        />
    );

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
                    data={chatListData}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => renderItem(item)}
                    style={styles.screen__contentBody}
                    contentContainerStyle={chatListData.length === 0 && { flex: 1 }}
                    ListEmptyComponent={
                        <View
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
