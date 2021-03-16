import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SignIn } from '../../../store/actions/auth';
import { RootState } from '../../../store';
import { IAuthState } from '../../../store/reducers/auth';

interface IUseSignIn extends IAuthState {
    signIn: (login: string, password: string) => void;
}

export const useSignIn = (): IUseSignIn => {
    const dispatch = useDispatch();
    const { isLoading, token, errors } = useSelector<RootState, IAuthState>(store => store.auth);

    const signIn = (login: string, password: string) => dispatch(SignIn({ login, password }));

    return { isLoading, token, errors, signIn };
};

export const useCredentialsData = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return { login, setLogin, password, setPassword };
};
