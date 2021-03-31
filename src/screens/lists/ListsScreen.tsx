import React, { createRef, ReactElement, useEffect, useState } from 'react';
import { FlatList, Image, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/molecules/ScreenHeader';
import { useSocketConnection } from '../../context/SocketSonnectionContext';
import IList from '../../models/List';
import PressableLabel, { PressableLabelType } from '../../components/atoms/PressableLabel';
import Space, { SpaceType } from '../../components/atoms/Space';
import TextInputWithLabel from '../../components/atoms/TextInputWithLabel';
import { Screens } from '../../utils/constants';

const ListsScreen = ({ navigation }) => {
    const [availableLists, setAvailableLists] = useState<Array<IList>>([]);
    const [addedListTitle, setAddedListTitle] = useState('');

    const socketConnection = useSocketConnection();

    if (socketConnection) {
        socketConnection.tasksConnection.getLists();
        socketConnection.tasksConnection.setOnGetListsHandler(response => {
            if (response.success && response.response) {
                if (availableLists.length === 0) {
                    setAvailableLists(response.response.lists);
                }
            }
        });
        socketConnection.tasksConnection.setOnCreateListHandler(response => {
            console.log(response);
            if (response.success && response.response) {
                setAvailableLists([...availableLists, response.response]);
            }
        });
    }

    const renderItem = (list: IList): ReactElement => {
        return (
            <PressableLabel
                type={[PressableLabelType.Large, PressableLabelType.Bold]}
                text={list.title}
                containerStyle={{ padding: 6 }}
                onPress={() => {
                    navigation.navigate(Screens.stacks.main, { screen: Screens.map, params: { listId: list.id } });
                }}
                rippleActive
            />
        );
    };

    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <ScreenHeader
                actionLeft={{
                    icon: require('../../assets/images/arrow-back.png'),
                    onPress: () => navigation.goBack(),
                    rippleActive: true,
                }}
                textPrimary='Список листов'
            />
            <FlatList
                data={availableLists}
                keyExtractor={list => list.id}
                renderItem={({ item: list }: { item: IList }) => renderItem(list)}
                style={{
                    marginTop: 36,
                    flex: 1,
                }}
                contentContainerStyle={availableLists.length === 0 && { flex: 1 }}
                ItemSeparatorComponent={() => (
                    <View>
                        <Space type={SpaceType.XXLittle} />
                        <View style={{ height: 1, backgroundColor: '#E5E5E5' }} />
                        <Space type={SpaceType.XXLittle} />
                    </View>
                )}
                ListFooterComponent={
                    <View style={{ paddingStart: 12, paddingEnd: 12 }}>
                        <Space type={SpaceType.XXLittle} />
                        <View style={{ height: 1, backgroundColor: '#E5E5E5' }} />
                        <Space type={SpaceType.XXLittle} />
                        <TextInputWithLabel
                            placeholder='Название листа'
                            containerStyle={{ width: '100%' }}
                            onChangeText={setAddedListTitle}
                            onSubmitEditing={() => {
                                if (socketConnection) {
                                    socketConnection.tasksConnection.createList({
                                        title: addedListTitle,
                                        description: 'description',
                                    });
                                }
                            }}
                        />
                    </View>
                }
            />
        </SafeAreaView>
    );
};

export default ListsScreen;
