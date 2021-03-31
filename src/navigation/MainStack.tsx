import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import { COLOR_BLUE_PRIMARY } from '../styles/colors';
import { Screens } from '../utils/constants';
import FeedScreen from '../screens/feed/FeedScreen';
import MapScreen from '../screens/map/MapScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import CreateTaskPrimaryScreen from '../screens/createTask/create_task_primary/CreateTaskPrimaryScreen';

const Tab = createBottomTabNavigator();

const MainStack = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: COLOR_BLUE_PRIMARY,
                tabStyle: styles.tabContainer,
                style: styles.tab,
                showLabel: false,
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconSource;

                    switch (route.name) {
                        case Screens.feed:
                            iconSource = focused
                                ? require('../assets/images/home_filled_icon.png')
                                : require('../assets/images/home_icon.png');
                            break;
                        case Screens.map:
                            iconSource = focused
                                ? require('../assets/images/map_filled_icon.png')
                                : require('../assets/images/map_icon.png');
                            break;
                        case Screens.chatList:
                            iconSource = focused
                                ? require('../assets/images/chat_filled_icon.png')
                                : require('../assets/images/chat_icon.png');
                            break;
                        case Screens.profile:
                            iconSource = focused
                                ? require('../assets/images/profile_filled_icon.png')
                                : require('../assets/images/profile_icon.png');
                            break;
                    }

                    return <Image style={styles.icon} source={iconSource} />;
                },
            })}
        >
            <Tab.Screen name={Screens.feed} component={FeedScreen} />
            <Tab.Screen name={Screens.map} component={MapScreen} />
            <Tab.Screen name={Screens.chatList} component={ChatScreen} />
            <Tab.Screen name={Screens.profile} component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default MainStack;

const styles = StyleSheet.create({
    tabContainer: {
        justifyContent: 'center',
    },
    tab: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    icon: {
        height: 32,
        width: 32,
    },
});
