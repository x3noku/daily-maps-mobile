import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import ScreenHeader from '../../../components/molecules/ScreenHeader';
import TextInputWithLabel from '../../../components/atoms/TextInputWithLabel';
import Space, { SpaceType } from '../../../components/atoms/Space';
import Button, { ButtonType } from '../../../components/atoms/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screens } from '../../../utils/constants';
import { TimePickerModal } from 'react-native-paper-dates';
import ITask, { TaskPriorityType } from '../../../models/Task';
import ILocation, { LocationType } from '../../../models/Location';
import { useSocketConnection } from '../../../context/SocketSonnectionContext';
import IList from '../../../models/List';
import { Picker } from '@react-native-picker/picker';
import { COLOR_TEXT_SECONDARY } from '../../../styles/colors';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Config from 'react-native-config';

MapboxGL.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);

const CreateTaskPrimaryScreen = ({ navigation, route }: { navigation: any; route: any }) => {
    const [task, setTask] = useState<ITask>({
        id: new Date().getTime().toString(),
        title: '',
        listId: '',
        description: '',
        date: { end: '', start: '' },
        author: undefined,
        isCompleted: false,
        location: {
            type: LocationType.point,
            coordinates: [],
        },
        priority: TaskPriorityType.none,
    });

    const [isStartTimePickerOpened, setIsStartTimePickerOpened] = useState(false);
    const [isEndTimePickerOpened, setIsEndTimePickerOpened] = useState(false);
    const [availableLists, setAvailableLists] = useState<Array<IList>>([]);
    const [availableListsElements, setAvailableListsElements] = useState<Array<ReactElement>>([]);

    const socketConnection = useSocketConnection();

    useEffect(() => {
        if (socketConnection) {
            socketConnection.tasksConnection.getLists();
            socketConnection.tasksConnection.setOnGetListsHandler(response => {
                if (response.success && response.response) {
                    setAvailableLists(response.response.lists);
                    const pickers: Array<ReactElement> = [];
                    response.response.lists.forEach((list: IList) => {
                        pickers.push(<Picker.Item key={list.id} label={list.title} value={list.id} />);
                    });
                    setAvailableListsElements(pickers);
                }
            });
        }

        console.log(route);
        task.location.coordinates = route.params.feature.geometry.coordinates;
        setTask(task);
    }, []);

    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <ScreenHeader
                actionLeft={{
                    icon: require('../../../assets/images/arrow-back.png'),
                    onPress: () => navigation.goBack(),
                    rippleActive: true,
                }}
                textPrimary='Создание новой задачи'
            />
            <ScrollView style={{ height: '100%' }} contentContainerStyle={{ padding: 24 }}>
                <TextInputWithLabel
                    placeholder='Название задачи'
                    containerStyle={{ width: '100%' }}
                    onChangeText={text => {
                        task.title = text;
                        setTask(task);
                    }}
                />

                <Space type={SpaceType.Big} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Picker
                        style={{ width: '50%', color: COLOR_TEXT_SECONDARY }}
                        mode='dropdown'
                        onValueChange={(value: TaskPriorityType) => {
                            task.priority = value;
                            setTask(task);
                        }}
                    >
                        <Picker.Item label='Нет' value={TaskPriorityType.none} />
                        <Picker.Item label='Минимальный' value={TaskPriorityType.low} />
                        <Picker.Item label='Средний' value={TaskPriorityType.medium} />
                        <Picker.Item label='Высокий' value={TaskPriorityType.high} />
                    </Picker>
                    {/*<TextInputWithLabel placeholder='Лист' containerStyle={{ width: '45%' }} />*/}
                    <Picker
                        style={{ width: '50%', color: COLOR_TEXT_SECONDARY }}
                        mode='dropdown'
                        onValueChange={(value: string) => {
                            task.listId = value;
                            setTask(task);
                        }}
                    >
                        {availableListsElements}
                    </Picker>
                </View>

                <Space type={SpaceType.Big} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextInputWithLabel
                        value={
                            task.date.start !== ''
                                ? (100 + new Date(task.date.start).getHours()).toString().substr(1, 2) +
                                  ':' +
                                  (100 + new Date(task.date.start).getMinutes()).toString().substr(1, 2)
                                : undefined
                        }
                        placeholder='Время начала'
                        containerStyle={{ width: '45%' }}
                        onFocus={() => setIsStartTimePickerOpened(true)}
                    />
                    <TextInputWithLabel
                        value={
                            task.date.end !== ''
                                ? (100 + new Date(task.date.end).getHours()).toString().substr(1, 2) +
                                  ':' +
                                  (100 + new Date(task.date.end).getMinutes()).toString().substr(1, 2)
                                : undefined
                        }
                        placeholder='Время конца'
                        containerStyle={{ width: '45%' }}
                        onFocus={() => setIsEndTimePickerOpened(true)}
                    />
                </View>

                <Space type={SpaceType.Big} />

                <TextInputWithLabel
                    placeholder='Описание'
                    containerStyle={{ width: '100%' }}
                    blurOnSubmit={false}
                    onChangeText={text => {
                        task.description = text;
                        setTask(task);
                    }}
                />

                <Space type={SpaceType.Big} />

                <MapboxGL.MapView
                    style={{ height: 320, width: '100%' }}
                    styleURL={MapboxGL.StyleURL.Street}
                    localizeLabels={true}
                >
                    <MapboxGL.Camera
                        zoomLevel={12}
                        centerCoordinate={
                            task.location.coordinates.length === 2 ? task.location.coordinates : [3.33624, 6.57901]
                        }
                        animationMode={'flyTo'}
                        animationDuration={0}
                    />
                    <MapboxGL.UserLocation />
                    {task.location.coordinates.length === 2 && (
                        <MapboxGL.PointAnnotation id='myMarker' coordinate={task.location.coordinates} />
                    )}
                </MapboxGL.MapView>

                <Space type={SpaceType.Big} />

                <Button
                    type={ButtonType.Contained}
                    text='Cоздать задачу'
                    onPress={() => {
                        console.log(task);

                        if (socketConnection) {
                            socketConnection.tasksConnection.createTask(task);
                            socketConnection.tasksConnection.setOnCreateTaskHandler(response => {
                                console.log(response);
                                if (response.success && response.response) {
                                    navigation.goBack();
                                }
                            });
                        }
                    }}
                    containerStyles={{
                        minWidth: '55%',
                        alignSelf: 'center',
                    }}
                    rippleActive
                />
            </ScrollView>

            <TimePickerModal
                visible={isStartTimePickerOpened}
                onDismiss={() => {
                    setIsStartTimePickerOpened(false);
                }}
                onConfirm={({ hours, minutes }) => {
                    let date = new Date();
                    date = new Date(
                        date.getUTCFullYear(),
                        date.getUTCMonth(),
                        date.getUTCDate(),
                        hours,
                        minutes,
                        date.getUTCSeconds(),
                    );
                    const isoDate = date.toISOString();

                    task.date.start = isoDate.replace(isoDate.substr(19, 4), '');
                    setTask(task);
                    setIsStartTimePickerOpened(false);
                }}
                label='Время начала выполнения задачи' // optional, default 'Select time'
                cancelLabel='Отмена' // optional, default: 'Cancel'
                confirmLabel='Ок' // optional, default: 'Ok'
                animationType='fade' // optional, default is 'none'
                locale={'en-US'} // optional, default is automically detected by your system
            />
            <TimePickerModal
                visible={isEndTimePickerOpened}
                onDismiss={() => {
                    setIsEndTimePickerOpened(false);
                }}
                onConfirm={({ hours, minutes }) => {
                    let date = new Date();
                    date = new Date(
                        date.getUTCFullYear(),
                        date.getUTCMonth(),
                        date.getUTCDate(),
                        hours,
                        minutes,
                        date.getUTCSeconds(),
                    );
                    const isoDate = date.toISOString();

                    task.date.end = isoDate.replace(isoDate.substr(19, 4), '');
                    setTask(task);
                    setIsEndTimePickerOpened(false);
                }}
                label='Время конца выполнения задачи' // optional, default 'Select time'
                cancelLabel='Отмена' // optional, default: 'Cancel'
                confirmLabel='Ок' // optional, default: 'Ok'
                animationType='fade' // optional, default is 'none'
                locale={'en-US'} // optional, default is automically detected by your system
            />
        </SafeAreaView>
    );
};

export default CreateTaskPrimaryScreen;
