import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WHITE } from '../../styles/colors';

export interface ICardProp {
    style?: any;
}

const Card: React.FC<ICardProp> = props => {
    const { style } = props;

    return <View style={[styles.card, style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: WHITE,
        width: '100%',
        height: '100%',
        borderRadius: 48,
    },
});

export default Card;
