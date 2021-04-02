import { useEffect } from 'react';
import { Keyboard } from 'react-native';

export const useFirstMount = (mountEffect: () => void) => {
    useEffect(() => {
        mountEffect();
    }, []);
};

export const useMount = (mountEffect: () => void, dependencyList: ReadonlyArray<any>) => {
    useEffect(() => {
        mountEffect();
    }, dependencyList);
};

export const useUnMount = (unMountEffect: () => void, dependencyList: ReadonlyArray<any>) => {
    useEffect(() => {
        return () => unMountEffect();
    }, dependencyList);
};

export const useFirstUnMount = (unMountEffect: () => void) => {
    useEffect(() => {
        return () => unMountEffect();
    }, []);
};

export const useKeyboardShow = (keyboardShowEffect: () => void) => {
    return useEffect(() => {
        const keyboardShowSubscription = Keyboard.addListener('keyboardDidShow', keyboardShowEffect);

        return () => {
            keyboardShowSubscription.remove();
        };
    }, []);
};

export const useKeyboardHide = (keyboardHideEffect: () => void) => {
    return useEffect(() => {
        const keyboardHideSubscription = Keyboard.addListener('keyboardDidHide', keyboardHideEffect);

        return () => {
            keyboardHideSubscription.remove();
        };
    }, []);
};
