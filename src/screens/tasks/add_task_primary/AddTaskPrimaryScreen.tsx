import React from 'react';
import { ScrollView, View } from 'react-native';
import ScreenHeader from '../../../components/molecules/ScreenHeader';
import TextInputWithLabel from '../../../components/atoms/TextInputWithLabel';
import Space, { SpaceType } from '../../../components/atoms/Space';
import Button, { ButtonType } from '../../../components/atoms/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddTaskPrimaryScreen = () => {
    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <ScreenHeader
                actionLeft={{ icon: require('../../../assets/images/arrow-back.png'), rippleActive: true }}
                textPrimary='Создание новой задачи'
            />
            <ScrollView style={{ flex: 1, backgroundColor: '#fdead5', padding: 24 }}>
                <TextInputWithLabel placeholder='Название задачи' containerStyle={{ width: '100%' }} />

                <Space type={SpaceType.Big} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextInputWithLabel placeholder='Приоритет задачи' containerStyle={{ width: '45%' }} />
                    <TextInputWithLabel placeholder='Время' containerStyle={{ width: '45%' }} />
                </View>

                <Space type={SpaceType.Big} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextInputWithLabel placeholder='Длительность' containerStyle={{ width: '45%' }} />
                    <TextInputWithLabel placeholder='Лист' containerStyle={{ width: '45%' }} />
                </View>

                <Space type={SpaceType.Big} />

                <TextInputWithLabel placeholder='Описание' containerStyle={{ width: '100%' }} />

                <Button type={ButtonType.Contained} text='Hello World' />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddTaskPrimaryScreen;
