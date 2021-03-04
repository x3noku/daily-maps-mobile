import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../utils/constants';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Screens.stacks.main} screenOptions={{headerShown: false}}>
                <Stack.Screen name={Screens.stacks.auth} component={AuthStack} />
                <Stack.Screen name={Screens.stacks.main} component={MainStack} />
            <Stack.Navigator initialRouteName={Screens.stacks.auth} screenOptions={{headerShown: false}}>
                <Stack.Screen name={Screens.stacks.auth} component={AuthStack} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
