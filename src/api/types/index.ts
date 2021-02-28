/**
 * @description This interfaces describes the data which every API response contains
 * @field success - boolean value describes outcome of request
 * @field response - API data response ( type of it depends from API Request ) ( null if success FALSE )
 * @field error - Object which contains all data about API error ( null if success TRUE )
 */
export interface IApiResponse<RD> {
    success: boolean
    response: RD | null,
    error: IApiError | null
}

/**
 * @description This interface describes the data responsible for the API error information
 * @field statusCode - unique code corresponding to a specific type of API error
 * @field message - error message
 */
export interface IApiError {
    statusCode: number,
    message: string | null
}

/**
 * @description This interface describes the data which API needs to work with request which needs user to be authorized
 * @field token - user's token
 */
export interface ITokenApiPayload {
   token: string
}
