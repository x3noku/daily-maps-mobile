import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SignUp } from '../../../store/actions/auth';
import { RootState } from '../../../store';
import { IAuthState } from '../../../store/reducers/auth';

interface IUseSignUp extends IAuthState {
    signUp: (username: string, email: string, login: string, password: string) => void;
}

export const useSignUp = (): IUseSignUp => {
    const dispatch = useDispatch();
    const { isLoading, token, errors } = useSelector<RootState, IAuthState>(store => store.auth);

    const signUp = (username: string, email: string, login: string, password: string) =>
        dispatch(SignUp({ email, username, login, password }));

    return { isLoading, token, errors, signUp };
};

export const useCredentialsData = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return { username, email, login, password, setUsername, setEmail, setLogin, setPassword };
};
