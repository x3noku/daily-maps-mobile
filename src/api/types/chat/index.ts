import IChat from '../../../models/chat/Chat';
import IMessage from '../../../models/chat/message/Message';

export interface ICreateChatApiPayload {
    users: Array<string>;
}

export interface ICreateChatApiResponse {
    chatId: string;
}

export interface IGetChatsApiResponse {
    chats: Array<IChat>;
}

export interface ISendMessageApiPayload extends IMessage {}

export interface ISendMessageApiResponse {
    messageId: string;
}

export interface IGetMessagesApiPayload {
    chatId: string;
}

export interface IGetMessagesApiResponse {
    messages: Array<IMessage>;

    chatId: string;
}

export interface IOnNewMessageApiResponse extends IMessage {}
