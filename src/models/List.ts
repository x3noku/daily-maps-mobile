import IUser from "./user/User";
import ITask from "./Task";

export default interface IList {
    id: string;
    
    title: string;
    
    author?: IUser | undefined;
    
    tasks?: Array<ITask>;
};

export const initList = (list: IList) => {
    return {
        ...list,
        tasks: list.tasks ? list.tasks : [],
    } as IList;
}
