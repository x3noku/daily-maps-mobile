import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../utils/constants';
import ListsScreen from '../screens/lists/ListsScreen';

const Stack = createStackNavigator();

const ListsStack = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.lists.lists} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={Screens.lists.lists} component={ListsScreen} />
        </Stack.Navigator>
    );
};

export default ListsStack;
