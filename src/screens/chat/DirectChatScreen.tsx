import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View, TextInput } from 'react-native';
import Card from '../../components/atoms/Card';
import { COLOR_BLUE_PRIMARY, COLOR_GRAY, COLOR_TEXT_SECONDARY, COLOR_WHITE } from '../../styles/colors';
import Label, { LabelType } from '../../components/atoms/Label';
import { SIZE_TEXT_PRIMARY } from '../../styles/sizes';
import ChatMessageElement from '../../components/molecules/ChatMessageElement';
import Space, { SpaceType } from '../../components/atoms/Space';

type Message = {
    text: string;
    owned: boolean;
    time: string;
};

const testMessages: Array<Message> = [
    {
        text:
            'Делаю shot как Лэмпард, взял победу как Бэкхем (Victoria)\n' +
            'Ты-ты улетаешь как Хэнкок, первый раз попав в Bando (В bando)\n' +
            'Пиздите как моя ex-hoe, кепки на вас будто Kangol (Фу-у, lean, lean)\n' +
            'На-на-набили слухами backpack, вам доносится эхо (Алло?)\n',
        owned: true,
        time: '9:35 AM',
    },
    {
        text: 'Алло-алло, сука, ты с улиц как Элмо, а (Ты красный)',
        owned: true,
        time: '9:35 AM',
    },
    {
        text:
            'Я с улиц Иркутска — поверь мне, тут тебя кинут на деньги, ха (Вэй-вэй-вэй)\n' +
            'Порежут-порежут на семплы, не смейся, ты не на stand up, а (Чу-у, а-ха)',
        owned: false,
        time: '10:35 AM',
    },
    {
        text:
            'А-а-алло-алло, покури ствол extendo, а (Алло-алло)\n' +
            'Куш пуш— Куш пушистый как gizmo, а (Gizmo)\n' +
            'Дел-дел-делаю пресс, как фитнесс, я пропал, будто призрак (Ghosty)\n' +
            'Сло-словил этот стресс, OBLA работал на износ (Я работал)',
        owned: true,
        time: '10:35 AM',
    },
    {
        text:
            'Со-соблюдай со мной distance, на бите я делаю бизнес (Без камер, а)\n' +
            '\n' +
            'Сделал бабки, как скаммер, палят меня, будто сканер (Скан, скан)\n' +
            'Мувы бо— Мувы бо— Мувы большие, но я двигаюсь так, что пропал с этих камер',
        owned: false,
        time: '10:40 AM',
    },
    {
        text: 'Ты крыса, ты сдал их, но это— но это был не экзамен (Snitch)',
        owned: true,
        time: '10:45 AM',
    },
];

const DirectChatScreen = ({ route }) => {
    const { name, avatar, isOnline } = route.params.userInfo;
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [inputHeight, setInputHeight] = useState<number | undefined>(undefined);
    const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);

    const renderItem = (item: Message) => (
        <View style={{ width: '100%', alignItems: item.owned ? 'flex-end' : 'flex-start' }}>
            <ChatMessageElement text={item.text} owned={item.owned} date={item.time} />
        </View>
    );

    useEffect(() => {
        setMessages(testMessages.reverse());
    }, []);

    return (
        <View style={styles.screen__container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/images/back.png')} style={styles.screen__back} />
                <View style={styles.element__avatarWrapper}>
                    <Image source={avatar} style={styles.element__avatar} />
                    <View style={styles.element__onlineOuterLayer}>
                        <View
                            style={[
                                styles.element__onlineInnerLayer,
                                { backgroundColor: isOnline ? COLOR_BLUE_PRIMARY : COLOR_TEXT_SECONDARY },
                            ]}
                        />
                    </View>
                </View>
                <Label
                    type={[LabelType.Large, LabelType.Bold]}
                    text={name}
                    textStyle={{ color: COLOR_WHITE }}
                    containerStyle={{ marginStart: 8, marginTop: 12, marginBottom: 12 }}
                />
            </View>
            <Card style={styles.screen__content}>
                <FlatList
                    inverted={true}
                    data={messages}
                    keyExtractor={(_, index) => index + ''}
                    renderItem={({ item }) => renderItem(item)}
                    ItemSeparatorComponent={() => <Space type={SpaceType.Medium} />}
                    style={{ marginTop: 36, flex: 1 }}
                    ListHeaderComponent={<Space type={SpaceType.Big} />}
                />
                <View
                    style={{
                        height: 'auto',
                        width: 'auto',
                        backgroundColor: COLOR_GRAY,
                        marginStart: 8,
                        marginEnd: 8,
                        marginBottom: 12,
                        borderRadius: 26,
                        overflow: 'hidden',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingStart: 12,
                        paddingEnd: 12,
                    }}
                >
                    <Image source={require('../../assets/images/attach_icon.png')} style={{ width: 24, height: 24 }} />
                    <View style={{ width: 8 }} />
                    <TextInput
                        onLayout={event => setInputWidth(event.nativeEvent.layout.width)}
                        style={{ flexGrow: 1, maxWidth: inputWidth, height: inputHeight, fontSize: SIZE_TEXT_PRIMARY }}
                        placeholder='Type a message'
                        multiline
                        onContentSizeChange={event => {
                            if (inputHeight === undefined) setInputHeight(event.nativeEvent.contentSize.height);
                            else if (event.nativeEvent.contentSize.height < SIZE_TEXT_PRIMARY * 7) {
                                setInputHeight(event.nativeEvent.contentSize.height);
                            }
                        }}
                    />
                    <View style={{ width: 8 }} />
                    <Image source={require('../../assets/images/Vector.png')} style={{ width: 24, height: 24 }} />
                    <View style={{ width: 8 }} />
                    <Image source={require('../../assets/images/Group.png')} style={{ width: 24, height: 24 }} />
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen__container: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: COLOR_BLUE_PRIMARY,
    },
    screen__back: {
        width: 36,
        height: 36,
        marginStart: 12,
    },
    screen__content: {
        flexGrow: 1,
        flexDirection: 'column',
        height: 'auto',
        overflow: 'hidden',
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
    },
    element__avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    element__avatarWrapper: {
        width: 44,
        height: 44,
        marginStart: 12,
    },
    element__onlineOuterLayer: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: 6,
        right: 0,
        bottom: 0,
        backgroundColor: COLOR_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    element__onlineInnerLayer: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
});

export default DirectChatScreen;
