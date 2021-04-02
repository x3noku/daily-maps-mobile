import ILocation from "./Location";
import IUser from "./user/User";

export default interface ITask {
    id: string;
    
    listId: string;
    
    title: string;
    
    description?: string;
    
    author?: IUser | undefined;
    
    priority?: TaskPriorityType;
    
    location: ILocation;
    
    date: {
        start: string;
        end: string;
    }
    
    isCompleted: boolean;
}

export const initTask = (task: ITask) => {
    return {
        ...task,
        description: task.description ? task.description : '',
        priority: task.priority ? task.priority : TaskPriorityType.none,
        isCompleted: task.isCompleted ? task.isCompleted : false,
    } as ITask;
};

export enum TaskPriorityType {
    high = 'high',
    medium = 'medium',
    low = 'low',
    none = 'none',
}
