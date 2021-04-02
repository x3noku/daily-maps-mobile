import { createAction, PayloadActionCreator } from '@reduxjs/toolkit';
import { IApiError, } from '../../api/types';
import { IApiActionPayload } from '../types';

/**
 * @description This function creates action with default fields for API actions
 * @param type - API data type ( instance: data for Sign In request )
 */
export const createApiAction = <AP=any, T extends string = string>(type: T) => {
    return createAction<IApiActionPayload<AP>>(type)
};

type RequestedActionsContainer<RD=any> = {
    request: PayloadActionCreator,
    success: PayloadActionCreator<RD>,
    fail: PayloadActionCreator<IApiError>,
}

/**
 * @description this function creates a container which contains all actions which can appear after HTTP Request
 * @param request - action, which would be dispatched when HTTP request starts
 * @param success - action, which would be dispatched when HTTP request finishes with statusCode >= 200 and <= 299
 * @param fail - action, which would be dispatched when HTTP request finishes with statusCode < 200 or >= 300
 */
export const createRequestedActionsContainer = <RD={}>(
    request: string,
    success: string,
    fail: string
): RequestedActionsContainer<RD> => {
    return {
        request : createAction(request),
        success : createAction<RD>(success),
        fail : createAction<RD>(fail)
    } as RequestedActionsContainer<RD>;
};
