import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
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

const testUsersData: Array<UserInfo> = [
    {
        name: 'Стив Хуйс',
        isOnline: true,
        lastMessage: {
            text: 'Я стив хуйс',
            date: '3:00pm',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Хуй Стивс',
        isOnline: true,
        lastMessage: {
            text: 'Хуй Стивс',
            date: '3:44am',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Яблоко',
        isOnline: false,
        lastMessage: {
            text: 'apple.apple@apple.com',
            date: '2:28pm',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Илья Мазепа',
        isOnline: true,
        lastMessage: {
            text: 'рыба',
            date: '0:00am',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Стив Хуйс 2',
        isOnline: true,
        lastMessage: {
            text: 'Я стив хуйс',
            date: '3:00pm',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Хуй Стивс 2',
        isOnline: true,
        lastMessage: {
            text: 'Хуй Стивс',
            date: '3:44am',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Яблоко 2',
        isOnline: false,
        lastMessage: {
            text: 'apple.apple@apple.com',
            date: '2:28pm',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Илья Мазепа 2',
        isOnline: true,
        lastMessage: {
            text: 'рыба',
            date: '0:00am',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Стив Хуйс 3',
        isOnline: true,
        lastMessage: {
            text: 'Я стив хуйс',
            date: '3:00pm',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Хуй Стивс 3',
        isOnline: true,
        lastMessage: {
            text: 'Хуй Стивс',
            date: '3:44am',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Яблоко 3',
        isOnline: false,
        lastMessage: {
            text: 'apple.apple@apple.com',
            date: '2:28pm',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Илья Мазепа 3',
        isOnline: true,
        lastMessage: {
            text: 'рыба',
            date: '0:00am',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Стив Хуйс 4',
        isOnline: true,
        lastMessage: {
            text: 'Я стив хуйс',
            date: '3:00pm',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Хуй Стивс 4',
        isOnline: true,
        lastMessage: {
            text: 'Хуй Стивс',
            date: '3:44am',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Яблоко 4',
        isOnline: false,
        lastMessage: {
            text: 'apple.apple@apple.com',
            date: '2:28pm',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Илья Мазепа 4',
        isOnline: true,
        lastMessage: {
            text: 'рыба',
            date: '0:00am',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Стив Хуйс 5',
        isOnline: true,
        lastMessage: {
            text: 'Я стив хуйс',
            date: '3:00pm',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Хуй Стивс 5',
        isOnline: true,
        lastMessage: {
            text: 'Хуй Стивс',
            date: '3:44am',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Яблоко 5',
        isOnline: false,
        lastMessage: {
            text: 'apple.apple@apple.com',
            date: '2:28pm',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
    {
        name: 'Илья Мазепа 5',
        isOnline: true,
        lastMessage: {
            text: 'рыба',
            date: '0:00am',
        },
        avatar: require('../../assets/images/avatar_debug.png'),
    },
];

const ChatScreen = () => {
    const navigation = useNavigation();

    const [chatListData, setChatListData] = useState<Array<UserInfo>>([]);

    useEffect(() => {
        setChatListData(testUsersData.slice(0, 20));
    }, []);

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
