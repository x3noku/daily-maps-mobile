import React from 'react';
import { View } from 'react-native';
import { getToken } from '../../../utils/storage';
import { Screens } from '../../../utils/constants';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
    getToken().then(token => {
        if (token !== null && token !== undefined) {
            navigation.navigate(Screens.stacks.main);
        } else {
            navigation.navigate(Screens.auth.signIn);
        }
    });

    return <View />;
};

export default WelcomeScreen;
