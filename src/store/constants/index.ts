const GlobalActionsTypes = {
    auth: {
        signIn: 'SIGN_IN',
        signUp: 'SIGN_UP',
        logOut: 'LOG_OUT',
    }
};

const Postfixes = {
    request: '_REQUEST',
    success: '_SUCCESS',
    fail: '_FAIL',
};

export const AuthActionsTypes = {
    signIn: {
        raw: GlobalActionsTypes.auth.signIn,
        request: GlobalActionsTypes.auth.signIn + Postfixes.request,
        success: GlobalActionsTypes.auth.signIn + Postfixes.success,
        fail: GlobalActionsTypes.auth.signIn + Postfixes.fail
    },
    signUp: {
        raw: GlobalActionsTypes.auth.signUp,
        request: GlobalActionsTypes.auth.signUp + Postfixes.request,
        success: GlobalActionsTypes.auth.signUp + Postfixes.success,
        fail: GlobalActionsTypes.auth.signUp + Postfixes.fail
    },
    logOut: {
        raw: GlobalActionsTypes.auth.logOut,
        request: GlobalActionsTypes.auth.logOut + Postfixes.request,
        success: GlobalActionsTypes.auth.logOut + Postfixes.success,
        fail: GlobalActionsTypes.auth.logOut + Postfixes.fail
    }
};
