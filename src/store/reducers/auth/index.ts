import { createReducer } from '@reduxjs/toolkit';
import { IApiInitialState } from '../../types';
import { LogOutRequestActions, SignInRequestActions, SignUpRequestActions } from '../../actions/auth';

export interface IAuthState extends IApiInitialState {
    token: string | null
}

const initialState = {
    isLoading: false,
    token: null,
    errors: null
} as IAuthState;

const authReducer = createReducer(initialState, (builder) => {
    builder
        // * Sign In * //
        .addCase(SignInRequestActions.request, (state) => {
            state.isLoading = true;
        })
        .addCase(SignInRequestActions.success, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
        })
        .addCase(SignInRequestActions.fail, (state, action) => {
            state.isLoading = false;
            state.errors?.push(action.payload);
        })
        // * Sign Up * //
        .addCase(SignUpRequestActions.request, (state) => {
            state.isLoading = true;
        })
        .addCase(SignUpRequestActions.success, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
        })
        .addCase(SignUpRequestActions.fail, (state, action) => {
            state.isLoading = false;
            state.errors?.push(action.payload)
        })
        // * Log Out * //
        .addCase(LogOutRequestActions.request, (state) => {
            state.isLoading = true;
        })
        .addCase(LogOutRequestActions.success, ((state, action) => {
            state.isLoading = false;
        }))
        .addCase(LogOutRequestActions.fail, ((state, action) => {
            state.isLoading = false;
        }))
});

export default authReducer;
