import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLOR_WHITE } from '../../styles/colors';

export interface ICardProp {
    style?: any;
}

const Card: React.FC<ICardProp> = props => {
    const { style } = props;

    return <View style={[styles.card, style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLOR_WHITE,
        width: '100%',
        height: '100%',
        borderRadius: 48,
    },
});

export default Card;
