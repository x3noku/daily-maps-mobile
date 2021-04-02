import SocketWrapper from './SocketWrapper';
import { Socket } from 'socket.io-client';
import {
    IAddUserToEventApiRequest,
    IAddUserToEventApiResponse,
    ICreateEventApiRequest,
    ICreateEventApiResponse,
    IGetEventByIdApiRequest,
    IGetEventByIdApiResponse,
    IGetEventsListApiResponse,
    IRemoveUserFromEventApiRequest,
    IRemoveUserFromEventApiResponse
} from '../../types/events';
import { SocketEvents } from '../../constants';
import { IApiResponse } from '../../types';

export default class EventSocketWrapper extends SocketWrapper {
    
    private onCreateEventHandler: (res: IApiResponse<ICreateEventApiResponse>) => void = () => {};
    
    private onGetEventByIdHandler: (res: IApiResponse<IGetEventByIdApiResponse>) => void = () => {};
    
    private onGetEventsListHandler: (res: IApiResponse<IGetEventsListApiResponse>) => void = () => {};
    
    private onAddUserToEventHandler: (res: IApiResponse<IAddUserToEventApiResponse>) => void = () => {};
    
    private onRemoveUserFromEventHandler: (res: IApiResponse<IRemoveUserFromEventApiRequest>) => void = () => {};
    
    constructor(socket: Socket) {
        super(socket);
        this.linkHandlersWithSocket();
    }
    
    public createEvent(data: ICreateEventApiRequest) {
        this.socket.emit(SocketEvents.events.createEvent, data);
    }
    
    public getEventById(data: IGetEventByIdApiRequest) {
        this.socket.emit(SocketEvents.events.getEvent, data);
    }
    
    public getEventsList() {
        this.socket.emit(SocketEvents.events.getEventsList, {});
    }
    
    public addUserToEvent(data: IAddUserToEventApiRequest) {
        this.socket.emit(SocketEvents.events.addUser, data);
    }
    
    public removeUserToEvent(data: IRemoveUserFromEventApiRequest) {
        this.socket.emit(SocketEvents.events.removeUserFromEvent, data);
    }
    
    public setCreateEventHandler(handler: (res: IApiResponse<ICreateEventApiResponse>) => void) {
        this.onCreateEventHandler = handler;
    }
    
    public setOnGetEventByIdHandler(handler: (res: IApiResponse<IGetEventByIdApiResponse>) => void) {
        this.onGetEventByIdHandler = handler;
    }
    
    public setOnGetEventsListHandler(handler: (res: IApiResponse<IGetEventsListApiResponse>) => void) {
        this.onGetEventsListHandler = handler;
    }
    
    public setOnAddUserToEventHandler(handler: (res: IApiResponse<IAddUserToEventApiResponse>) => void) {
        this.onAddUserToEventHandler = handler;
    }
    
    public setOnRemoveUserFromEventHandler(handler: (res: IApiResponse<IRemoveUserFromEventApiResponse>) => void) {
        this.onRemoveUserFromEventHandler = handler;
    }
    
    protected linkHandlersWithSocket = () => {
        this.socket.on(SocketEvents.events.createEvent, res => this.onCreateEventHandler(res));
        this.socket.on(SocketEvents.events.getEvent, res => this.onGetEventByIdHandler(res));
        this.socket.on(SocketEvents.events.getEventsList, res => this.onGetEventsListHandler(res));
        this.socket.on(SocketEvents.events.addUser, res => this.onAddUserToEventHandler(res));
        this.socket.on(SocketEvents.events.removeUserFromEvent, res => this.onRemoveUserFromEventHandler(res));
    }
}
