import { useEffect } from 'react';

export const useFirstMount = (mountEffect: () => void) => {
    useEffect(() => {
        mountEffect();
    }, [])
};

export const useMount = (mountEffect: () => void, dependencyList: ReadonlyArray<any>) => {
    useEffect(() => {
        mountEffect();
    }, dependencyList)
};

export const useUnMount = (unMountEffect: () => void, dependencyList: ReadonlyArray<any>) => {
    useEffect(() => {
        return () => unMountEffect();
    }, dependencyList)
};

export const useFirstUnMount = (unMountEffect: () => void) => {
    useEffect(() => {
        return () => unMountEffect();
    }, [])
};
