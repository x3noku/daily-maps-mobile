import IUser from '../../user/User';

export default interface IMessage {

    messageId: string,

    chatId: string,

    author: IUser,

    type: MessageType,

    body: string, // TODO: Define type

    isOwned: boolean,

    isDeleted: boolean,

    date: Date | string,

    attachments: boolean,
}

export enum MessageType {
    string = 'string',
}
