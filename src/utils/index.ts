import { Dimensions } from 'react-native';

export const ripple = (color: string): string => {
    // @ts-ignore
    const [r, g, b] = color
        .replace('#', '')
        .match(/.{1,2}/g)
        .map(number => parseInt(number, 16) + Math.round((255 - parseInt(number, 16)) / 2));

    return '#' + [r, g, b].map(number => number.toString(16)).join('');
};

export const getRootWidthPercents = (percents: number): number => Dimensions.get('window').width * (percents / 100.0);

export const getRootHeightPercents = (percents: number): number => Dimensions.get('window').height * (percents / 100.0);
