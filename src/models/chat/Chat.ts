import IMessage from './message/Message';
import IUser from '../user/User';

export default interface IChat {
    title: string,

    lastMessage: IMessage,

    users: Array<IUser>,

    type: ChatType,

    chatId: string,
}

export enum ChatType {
    private = 'private',
}
