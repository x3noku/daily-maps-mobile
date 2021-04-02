import ILocation from '../../../models/Location';
import { IDateContainer } from '../../../types';
import IEvent from '../../../models/Event';

export interface ICreateEventApiRequest {
    title: string;

    description?: string;

    placeName: string;

    location: ILocation;

    date: IDateContainer;
}

export interface ICreateEventApiResponse {}

export interface IGetEventByIdApiRequest {
    eventId: string;
}

export interface IGetEventByIdApiResponse {
    event: IEvent;
}

export interface IGetEventsListApiResponse {
    events: Array<IEvent>;
}

export interface IAddUserToEventApiRequest {
    eventId: string;

    userLogin: string;
}

export interface IAddUserToEventApiResponse extends IAddUserToEventApiRequest {}

export interface IRemoveUserFromEventApiRequest {
    eventId: string;

    userLogin: string;
}

export interface IRemoveUserFromEventApiResponse extends IRemoveUserFromEventApiRequest {}
