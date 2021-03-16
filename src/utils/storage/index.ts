import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants';

export const saveToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(StorageKeys.token, token);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

export const removeToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(StorageKeys.token);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getToken = async (): Promise<string | undefined | null> => {
    try {
        const token = await AsyncStorage.getItem(StorageKeys.token);
        return Promise.resolve(token);
    } catch (error) {
        return Promise.reject(error);
    }
};
