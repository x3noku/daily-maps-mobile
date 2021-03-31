import IList from '../../../models/List';
import ITask from '../../../models/Task';

export interface ICreateListApiRequest {
    title: string;
    description: string;
}

export interface ICreateListApiResponse extends IList {}

export interface IGetListByIdApiRequest {
    id: string;
}

export interface IGetListByIdApiResponse {
    list: IList;
}

export interface IGetListsApiResponse {
    lists: Array<IList>;
}

export interface IPushTaskToListApiRequest {
    id: string;

    taskId: string;
}

export interface IPushTaskToListApiResponse extends IPushTaskToListApiRequest {}

export interface IRemoveTaskFromListApiRequest {
    id: string;

    listId: string;
}

export interface IRemoveTaskFromListApiResponse extends IRemoveTaskFromListApiRequest {}

export interface IRemoveListApiRequest {
    id: string;
}

export interface IRemoveListApiResponse extends IRemoveListApiRequest {}

export interface ICreateTaskApiRequest extends ITask {}

export interface ICreateTaskApiResponse extends ITask {}

export interface IGetTaskByIdApiRequest {
    id: string;
}

export interface IGetTaskByIdApiResponse {
    task: ITask;
}

export interface IChangeTaskApiRequest {
    id: string;

    title?: string;

    description?: string;
}

export interface IChangeTaskApiResponse extends IChangeTaskApiRequest {}

export interface ICompleteTaskApiRequest {
    id: string;
}

export interface ICompleteTaskApiResponse {
    id: string;

    isCompleted: boolean;
}

export interface IRemoveTaskApiRequest {
    id: string;
}

export interface IRemoveTaskApiResponse extends IRemoveTaskApiRequest {}
