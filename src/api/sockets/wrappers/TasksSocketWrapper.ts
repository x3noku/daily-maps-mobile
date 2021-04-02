import { ThemeProvider } from '@react-navigation/native';
import { Socket } from 'socket.io-client';
import { SocketEvents } from '../../constants';
import { IApiResponse } from '../../types';
import {
    IChangeTaskApiRequest,
    IChangeTaskApiResponse,
    ICompleteTaskApiRequest,
    ICompleteTaskApiResponse,
    ICreateListApiRequest, ICreateListApiResponse,
    ICreateTaskApiRequest,
    ICreateTaskApiResponse,
    IGetListByIdApiRequest,
    IGetListByIdApiResponse,
    IGetListsApiResponse,
    IGetTaskByIdApiRequest,
    IGetTaskByIdApiResponse,
    IPushTaskToListApiRequest,
    IPushTaskToListApiResponse,
    IRemoveListApiRequest,
    IRemoveListApiResponse,
    IRemoveTaskApiRequest,
    IRemoveTaskApiResponse,
    IRemoveTaskFromListApiRequest,
    IRemoveTaskFromListApiResponse
} from "../../types/tasks";
import SocketWrapper from './SocketWrapper';

export default class TasksSocketWrapper extends SocketWrapper {
    
    private onCreateListHandler: (res: IApiResponse<ICreateTaskApiResponse>) => void = () => {};
    
    private onGetListByIdHandler: (res: IApiResponse<IGetListByIdApiResponse>) => void = () => {};
    
    private onGetListsHandler: (res: IApiResponse<IGetListsApiResponse>) => void = () => {};
    
    private onPushTaskToListHandler: (res: IApiResponse<IPushTaskToListApiResponse>) => void = () => {};
    
    private onRemoveTaskFromListHandler: (res: IApiResponse<IRemoveTaskFromListApiResponse>) => void = () => {};
    
    private onRemoveListHandler: (res: IApiResponse<IRemoveListApiResponse>) => void = () => {};
    
    private onCreateTaskHandler: (res: IApiResponse<ICreateTaskApiResponse>) => void = () => {};
    
    private onGetTaskByIdHandler: (res: IApiResponse<IGetTaskByIdApiResponse>) => void = () => {};
    
    private onChangeTaskHandler: (res: IApiResponse<IChangeTaskApiResponse>) => void = () => {};
    
    private onCompleteTaskHandler: (res: IApiResponse<ICompleteTaskApiResponse>) => void = () => {};
    
    private onRemoveTaskHandler: (res: IApiResponse<IRemoveTaskApiResponse>) => void = () => {};
    
    constructor(socket: Socket) {
        super(socket);
        this.linkHandlersWithSocket();
    }
    
    public createList(data: ICreateListApiRequest) {
        this.socket.emit(SocketEvents.tasks.createList, data);
    }
    
    public getListById(data: IGetListByIdApiRequest) {
        this.socket.emit(SocketEvents.tasks.getListById, data);
    }
    
    public getLists() {
        this.socket.emit(SocketEvents.tasks.getLists, {});
    }
    
    public pushTaskToList(data: IPushTaskToListApiRequest) {
        this.socket.emit(SocketEvents.tasks.pushTaskToList, data);
    }
    
    public removeTaskFromList(data: IRemoveTaskFromListApiRequest) {
        this.socket.emit(SocketEvents.tasks.removeTaskFromList, data);
    }
    
    public removeList(data: IRemoveListApiRequest) {
        this.socket.emit(SocketEvents.tasks.removeList, data);
    }
    
    public createTask(data: ICreateTaskApiRequest) {
        this.socket.emit(SocketEvents.tasks.createTask, data);
    }
    
    public getTaskById(data: IGetTaskByIdApiRequest) {
        this.socket.emit(SocketEvents.tasks.getTaskById, data);
    }
    
    public changeTask(data: IChangeTaskApiRequest) {
        this.socket.emit(SocketEvents.tasks.changeTask, data);
    }
    
    public completeTask(data: ICompleteTaskApiRequest) {
        this.socket.emit(SocketEvents.tasks.completeTask, data);
    }
    
    public removeTask(data: IRemoveTaskApiRequest) {
        this.socket.emit(SocketEvents.tasks.removeTask, data);
    }
    
    public setOnCreateListHandler(handler: (res: IApiResponse<ICreateListApiResponse>) => void) {
        this.onCreateListHandler = handler;
    }
    
    public setOnGetListByIdHandler(handler: (res: IApiResponse<IGetListByIdApiResponse>) => void) {
        this.onGetListByIdHandler = handler;
    }
    
    public setOnGetListsHandler(handler: (res: IApiResponse<IGetListsApiResponse>) => void) {
        this.onGetListsHandler = handler;
    }
    
    public setOnRemoveListHandler(handler: (res: IApiResponse<IRemoveListApiResponse>) => void) {
        this.onRemoveListHandler = handler;
    }
    
    public setOnPushTaskToListHandler(handler: (res: IApiResponse<IPushTaskToListApiResponse>) => void) {
        this.onPushTaskToListHandler = handler;
    }
    
    public setOnRemoveTaskFromListHandler(handler: (res: IApiResponse<IRemoveTaskFromListApiResponse>) => void) {
        this.onRemoveTaskFromListHandler = handler;
    }
    
    public setOnCreateTaskHandler(handler: (res: IApiResponse<ICreateTaskApiResponse>) => void) {
        this.onCreateTaskHandler = handler;
    }
    
    public setOnGetTaskByIdHandler(handler: (res: IApiResponse<IGetTaskByIdApiResponse>) => void) {
        this.onGetTaskByIdHandler = handler;
    }
    
    public setOnChangeTaskHandler(handler: (res: IApiResponse<IChangeTaskApiResponse>) => void) {
        this.onChangeTaskHandler = handler;
    }
    
    public setOnCompleteTaskHandler(handler: (res: IApiResponse<ICompleteTaskApiResponse>) => void) {
        this.onCompleteTaskHandler = handler;
    }
    
    public setRemoveTaskHandler(handler: (res: IApiResponse<IRemoveListApiResponse>) => void) {
        this.onRemoveTaskFromListHandler = handler;
    }
    
    protected linkHandlersWithSocket = () => {
        this.socket.on(SocketEvents.tasks.createList, res => this.onCreateListHandler(res));
        this.socket.on(SocketEvents.tasks.getListById, res => this.onGetListByIdHandler(res));
        this.socket.on(SocketEvents.tasks.getLists, res => this.onGetListsHandler(res));
        this.socket.on(SocketEvents.tasks.removeList, res => this.onRemoveListHandler(res));
        this.socket.on(SocketEvents.tasks.pushTaskToList, res => this.onPushTaskToListHandler(res));
        this.socket.on(SocketEvents.tasks.removeTaskFromList, res => this.onRemoveTaskFromListHandler(res));
        this.socket.on(SocketEvents.tasks.createTask, res => this.onCreateTaskHandler(res));
        this.socket.on(SocketEvents.tasks.getTaskById, res => this.onGetTaskByIdHandler(res));
        this.socket.on(SocketEvents.tasks.changeTask, res => this.onChangeTaskHandler(res));
        this.socket.on(SocketEvents.tasks.completeTask, res => this.onCompleteTaskHandler(res));
        this.socket.on(SocketEvents.tasks.removeTask, res => this.onRemoveTaskHandler(res));
    };
}
