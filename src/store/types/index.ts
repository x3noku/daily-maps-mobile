import { IApiError } from '../../api/types';

/**
 * @description This interface describes initial state for every API reducer
 * @field isLoading - boolean value, shows that API action process
 * @field errors - array of errors, which appears while actions with API
 */
export interface IApiInitialState {
    isLoading: boolean,
    errors: Array<IApiError> | null
}

/**
 * @description This type describes supporting by API HTTP methods
 */
type Method = 'POST' | 'GET';

/**
 * @description This interface describes data which every API Redux action contains
 * @field rest - URI
 * @field method - HTTP Method type
 * @field data - API action data
 */
export interface IApiActionPayload<D=any> {
    rest: string,
    method: Method,
    data: D
}
