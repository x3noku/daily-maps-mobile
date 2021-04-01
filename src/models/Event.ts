import ILocation from './Location';
import { IDateContainer } from '../types';
import IUser from './user/User';

export default interface IEvent {
    eventId: string; //TODO: Rename with 'id' after finishing with serializing
    
    title: string;
    
    description?: string;
    
    placeName: string;
    
    users?: Array<IUser>;
    
    author?: IUser;
    
    privacy: IEventPrivacyType;
    
    location: ILocation;
    
    date: IDateContainer;
}

export enum IEventPrivacyType {
    public = 'public',
}
