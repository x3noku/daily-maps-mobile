import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../utils/constants';
import CreateTaskPrimaryScreen from '../screens/createTask/create_task_primary/CreateTaskPrimaryScreen';
import CreateTaskSecondaryScreen from '../screens/createTask/create_task_secondary/CreateTaskSecondaryScreen';

const Stack = createStackNavigator();

const CreateTaskStack = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.createTask.primary} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={Screens.createTask.primary} component={CreateTaskPrimaryScreen} />
            <Stack.Screen name={Screens.createTask.secondary} component={CreateTaskSecondaryScreen} />
        </Stack.Navigator>
    );
};

export default CreateTaskStack;
