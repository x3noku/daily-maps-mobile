import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppNavigator from './navigation/AppNavigator';
import {SocketConnectionProvider} from "./context/SocketConnection";

const App = () => {
    return (
        <Provider store={store}>
            <SocketConnectionProvider>
                <AppNavigator/>
            </SocketConnectionProvider>
        </Provider>
    );
};

export default App;
