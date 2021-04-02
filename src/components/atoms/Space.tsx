import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

export interface ISpaceProp {
    type: SpaceType;
}

export enum SpaceType {
    XXXLittle,
    XXLittle,
    XLittle,
    Little,
    Small,
    Default,
    Big,
    Large,
    XLarge,
    XXLarge,
    XXXLarge,
}

const Space: React.FC<ISpaceProp> = props => {
    const { type } = props;

    const [height, setHeight] = useState(0);

    useEffect(() => {
        switch (type) {
            case SpaceType.XXXLittle:
                setHeight(2);
                break;
            case SpaceType.XXLittle:
                setHeight(4);
                break;
            case SpaceType.XLittle:
                setHeight(6);
                break;
            case SpaceType.Little:
                setHeight(8);
                break;
            case SpaceType.Small:
                setHeight(12);
                break;
            case SpaceType.Default:
                setHeight(16);
                break;
            case SpaceType.Big:
                setHeight(20);
                break;
            case SpaceType.Large:
                setHeight(24);
                break;
            case SpaceType.XLarge:
                setHeight(32);
                break;
            case SpaceType.XXLarge:
                setHeight(48);
                break;
            case SpaceType.XXXLarge:
                setHeight(64);
                break;
        }
    }, []);

    return <View style={{ width: '100%', height: height }} />;
};

export default Space;
