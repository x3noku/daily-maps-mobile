import React, { createContext, useContext, useState } from "react";
import SocketConnection from '../api/sockets/SocketConnection';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { IAuthState } from '../store/reducers/auth';
import { getToken } from "../utils/storage";

const SocketConnectionContext = createContext<SocketConnection | undefined>(undefined);

// ! Probably socketConnection can be undefined (if token does not exist) ! //
//TODO: Remove redux from here!
export const SocketConnectionProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<string | undefined>(undefined);
    getToken().then(value => setToken(value || undefined));
    
    if (!token) return <SocketConnectionContext.Provider value={undefined}>{children}</SocketConnectionContext.Provider>;

    const socketConnection = new SocketConnection(token, Config.SOCKET_URL);
    socketConnection.setOnConnectHandler(() => console.log('Connect'));

    return <SocketConnectionContext.Provider value={token ? socketConnection : undefined}>{children}</SocketConnectionContext.Provider>;
};

export const useSocketConnection = (): SocketConnection => {
    return useContext(SocketConnectionContext) as SocketConnection;
};
