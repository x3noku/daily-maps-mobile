import { createApiAction, createRequestedActionsContainer } from '../../tools';
import { ISignInApiPayload, ISignInApiResponse, ISignUpApiPayload, ISignUpApiResponse } from '../../../api/types/auth';
import { AuthActionsTypes } from '../../constants';
import { AuthRests } from '../../../api/constants';
import { ITokenApiPayload } from '../../../api/types';

// * Sign In * //
const signInAction = createApiAction<ISignInApiPayload>(AuthActionsTypes.signIn.raw);

export const SignIn = (raw: ISignInApiPayload) => {
    return signInAction({
        rest: AuthRests.signIn,
        method: 'POST',
        data: raw
    })
};

export const SignInRequestActions = createRequestedActionsContainer<ISignInApiResponse>(
    AuthActionsTypes.signIn.request,
    AuthActionsTypes.signIn.success,
    AuthActionsTypes.signIn.fail
);

// * Sign Up * //
const signUpAction = createApiAction<ISignUpApiPayload>(AuthActionsTypes.signUp.raw);

export const SignUp = (raw: ISignUpApiPayload) => {
    return signUpAction({
        rest: AuthRests.signUp,
        method: 'POST',
        data: raw
    })
};

export const SignUpRequestActions = createRequestedActionsContainer<ISignUpApiResponse>(
    AuthActionsTypes.signUp.request,
    AuthActionsTypes.signUp.success,
    AuthActionsTypes.signUp.fail
);

// * Log Out * //
const logOutAction = createApiAction<ITokenApiPayload>(AuthActionsTypes.logOut.raw);

export const LogOut = (raw: ITokenApiPayload) => {
    return logOutAction({
        rest: AuthRests.logOut,
        method: 'POST',
        data: raw
    })
};

export const LogOutRequestActions = createRequestedActionsContainer(
    AuthActionsTypes.logOut.request,
    AuthActionsTypes.logOut.success,
    AuthActionsTypes.logOut.fail
);
