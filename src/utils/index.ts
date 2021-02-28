export const ripple = (color: string): string => {
    // @ts-ignore
    const [r, g, b] = color
        .replace('#', '')
        .match(/.{1,2}/g)
        .map(number => parseInt(number, 16) + Math.round((255 - parseInt(number, 16)) / 2));

    return '#' + [r, g, b].map(number => number.toString(16)).join('');
};
