import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../utils/constants';
import SignInScreen from '../screens/auth/sign_in/SignInScreen';
import SignUpScreen from '../screens/auth/sign_up/SignUpScreen';
import WelcomeScreen from '../screens/auth/welcome/WelcomeScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.auth.welcome} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={Screens.auth.signIn} component={SignInScreen} />
            <Stack.Screen name={Screens.auth.signUp} component={SignUpScreen} />
            <Stack.Screen name={Screens.auth.welcome} component={WelcomeScreen} />
        </Stack.Navigator>
    );
};

export default AuthStack;
