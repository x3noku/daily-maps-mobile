import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../utils/constants';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import DirectChatScreen from '../screens/chat/DirectChatScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Screens.stacks.main} screenOptions={{ headerShown: false }}>
                <Stack.Screen name={Screens.stacks.auth} component={AuthStack} />
                <Stack.Screen name={Screens.stacks.main} component={MainStack} />
                <Stack.Screen name={Screens.stacks.chatDirect} component={DirectChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
