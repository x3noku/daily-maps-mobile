/**
 * @description This interface describes data which API needs to sign in user
 * @field login - user's login
 * @field password - hashed user's password
 */
export interface ISignInApiPayload {
    login: string,
    password: string,
}

/**
 * @description This interface describes data which API returns after user signed in
 * @field token - user's token
 */
export interface ISignInApiResponse {
    token: string | null
}

/**
 * @description This interface describes data which API needs to sign up user
 * @field email - user's email
 * @field username - user's name
 */
export interface ISignUpApiPayload extends ISignInApiPayload {
    email: string
    username: string
}

/**
 * @description This interface describes data which API returns after user signed up
 */
export interface ISignUpApiResponse extends ISignInApiResponse {}
