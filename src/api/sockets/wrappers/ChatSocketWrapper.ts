import SocketWrapper from './SocketWrapper';
import { Socket } from 'socket.io-client';
import { SocketEvents } from '../../constants';
import {
    ICreateChatApiPayload,
    ICreateChatApiResponse,
    IGetChatsApiResponse, IGetMessagesApiPayload,
    IGetMessagesApiResponse, IOnNewMessageApiResponse, ISendMessageApiPayload,
    ISendMessageApiResponse
} from '../../types/chat';
import { IApiResponse } from '../../types';

export default class ChatSocketWrapper extends SocketWrapper {

    private onConnectHandler: (res: IApiResponse<object>) => void = () => {};

    private onCreatePrivateChatHandler: (res: IApiResponse<ICreateChatApiResponse>) => void = () => {};

    private onGetChatsHandler: (res: IApiResponse<IGetChatsApiResponse>) => void = () => {};

    private onSendMessageHandler: (res: IApiResponse<ISendMessageApiResponse>) => void = () => {};

    private onGetMessagesHandler: (res: IApiResponse<IGetMessagesApiResponse>) => void = () => {};

    private onNewMessageHandler: (res: IApiResponse<IOnNewMessageApiResponse>) => void = () => {};

    constructor(socket: Socket) {
        super(socket);
        this.linkHandlersWithSocket();
    }

    public connect() {
        this.socket.emit(SocketEvents.chat.connect, {});
    }

    public createPrivateChat(data: ICreateChatApiPayload) {
        this.socket.emit(SocketEvents.chat.createPrivateChat, { users: data.users });
    }

    public getChats() {
        this.socket.emit(SocketEvents.chat.getChats, {});
    }

    public getChatMessages(data: IGetMessagesApiPayload) {
        this.socket.emit(SocketEvents.chat.getChatMessages, { chatId: data.chatId });
    }

    public sendMessage(message: ISendMessageApiPayload) {
        this.socket.emit(SocketEvents.chat.sendMessage, message);
    }

    public setOnConnectHandler(handler: () => void) {
        this.onConnectHandler = handler;
    }

    public setOnCreatePrivateChatHandler(handler: (res: IApiResponse<ICreateChatApiResponse>) => void) {
        this.onCreatePrivateChatHandler = handler;
    }

    public setOnGetChatsHandler(handler: (res: IApiResponse<IGetChatsApiResponse>) => void) {
        this.onGetChatsHandler = handler;
    }

    public setOnSendMessageHandler(handler: (res: IApiResponse<ISendMessageApiResponse>) => void) {
        this.onSendMessageHandler = handler;
    }

    public setOnGetMessagesHandler(handler: (res: IApiResponse<IGetMessagesApiResponse>) => void) {
        this.onGetMessagesHandler = handler;
    }

    public setOnNewMessageHandler(handler: (res: IApiResponse<IOnNewMessageApiResponse>) => void) {
        this.onNewMessageHandler = handler;
    }

    linkHandlersWithSocket = () => {
        this.socket.on(SocketEvents.chat.connect, res => this.onConnectHandler(res));
        this.socket.on(SocketEvents.chat.createPrivateChat, res => this.onCreatePrivateChatHandler(res));
        this.socket.on(SocketEvents.chat.getChats, res => this.onGetChatsHandler(res));
        this.socket.on(SocketEvents.chat.sendMessage, res => this.onSendMessageHandler(res));
        this.socket.on(SocketEvents.chat.getChatMessages, res => this.onGetMessagesHandler(res));
        this.socket.on(SocketEvents.chat.newMessage, res => this.onNewMessageHandler(res))
    };
}
