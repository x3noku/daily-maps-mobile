import React, { ReactElement } from 'react';
import { ImageSourcePropType, StyleProp, StyleSheet, View } from 'react-native';
import IconButton, { IconButtonType } from '../atoms/IconButton';
import { getRootWidthPercents, ripple } from '../../utils';
import Label, { LabelType } from '../atoms/Label';
import {
    COLOR_BLUE_PRIMARY,
    COLOR_BLUE_SECONDARY,
    COLOR_TEXT_PRIMARY,
    COLOR_TEXT_SECONDARY,
} from '../../styles/colors';
import { ButtonType } from '../atoms/Button';

export interface IScreenHeaderActionProp {
    icon: ImageSourcePropType;
    onPress?: (event: Event) => void;
    rippleActive?: boolean;
}

export interface IScreenHeaderProp {
    type?: ScreenHeaderType;
    actionLeft?: IScreenHeaderActionProp;
    actionRight?: IScreenHeaderActionProp;
    textPrimary?: string;
    textSecondary?: string;
    shadowSecondaryText?: boolean;
}

export enum ScreenHeaderType {
    ALIGN_LEFT,
    ALIGN_CENTER,
    ALIGN_RIGHT,
}

const ScreenHeader: React.FC<IScreenHeaderProp> = props => {
    const { type, textPrimary, textSecondary, actionLeft, actionRight, shadowSecondaryText } = props;

    let typedStyle: StyleProp<any> = null;
    switch (type) {
        case ScreenHeaderType.ALIGN_LEFT:
            typedStyle = styles.header__textContainer_type_alignLeft;
            break;
        case ScreenHeaderType.ALIGN_CENTER:
            typedStyle = styles.header__textContainer_type_alignCenter;
            break;
        case ScreenHeaderType.ALIGN_RIGHT:
            typedStyle = styles.header__textContainer_type_alignRight;
            break;
    }

    return (
        <View style={styles.header__container}>
            <IconButton
                icon={actionLeft?.icon}
                type={[IconButtonType.Icon, IconButtonType.Small]}
                onPress={actionLeft?.onPress}
                rippleActive={actionLeft?.rippleActive}
                containerStyles={styles.header__action}
            />

            <View style={[styles.header__textContainer, typedStyle]}>
                {textPrimary && (
                    <Label
                        type={[LabelType.Big, LabelType.Bold]}
                        text={textPrimary}
                        textStyle={[styles.header__text, { color: COLOR_TEXT_PRIMARY }, typedStyle]}
                        containerStyle={typedStyle}
                    />
                )}
                {textSecondary && (
                    <Label
                        type={[LabelType.Small, LabelType.Bold]}
                        text={textSecondary}
                        textStyle={[
                            styles.header__text,
                            {
                                color: shadowSecondaryText ? COLOR_TEXT_SECONDARY : COLOR_TEXT_PRIMARY,
                            },
                            typedStyle,
                        ]}
                        containerStyle={typedStyle}
                    />
                )}
            </View>

            <IconButton
                icon={actionRight?.icon}
                type={[IconButtonType.Icon, IconButtonType.Small]}
                onPress={actionRight?.onPress}
                rippleActive={actionRight?.rippleActive}
                containerStyles={styles.header__action}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header__container: {
        width: getRootWidthPercents(100),
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        paddingTop: 12,
    },
    header__action: {},
    header__textContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    header__text: {
        textAlign: 'center',
    },
    header__textContainer_type_alignLeft: {
        alignItems: 'flex-start',
        textAlign: 'left',
    },
    header__textContainer_type_alignCenter: {
        alignItems: 'center',
        textAlign: 'center',
    },
    header__textContainer_type_alignRight: {
        alignItems: 'flex-end',
        textAlign: 'right',
    },
});

export default ScreenHeader;
