import { io, Socket } from 'socket.io-client';
import { SocketEvents } from '../constants';
import ChatSocketWrapper from './wrappers/ChatSocketWrapper';
import TasksSocketWrapper from './wrappers/TasksSocketWrapper';
import EventSocketWrapper from './wrappers/EventSocketWrapper';

export default class SocketConnection {

    private readonly socket: Socket;

    private onConnectHandler: () => void = () => {};

    private onDisconnectHandler: () => void = () => {};

    public readonly chatConnection: ChatSocketWrapper;
    public readonly tasksConnection: TasksSocketWrapper;
    public readonly eventsConnection: EventSocketWrapper;

    constructor(token: string, url: string) {
        this.socket = io(url, { path: '/socket', query: { token }});
        this.linkHandlersWithSocket();
        this.chatConnection = new ChatSocketWrapper(this.socket);
        this.tasksConnection = new TasksSocketWrapper(this.socket);
        this.eventsConnection = new EventSocketWrapper(this.socket);
    };

    public setOnConnectHandler(handler: () => void) {
        this.onConnectHandler = handler;
    }

    public setOnDisconnectHandler(handler: () => void) {
        this.onDisconnectHandler = handler;
    }

    private linkHandlersWithSocket() {
        this.socket.on(SocketEvents.connection.connect, () => this.onConnectHandler());
        this.socket.on(SocketEvents.connection.disconnect, () => this.onDisconnectHandler());
    };
}
