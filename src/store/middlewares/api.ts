import Config from 'react-native-config';

const BASE_URL = Config.URL;

const api = ({ dispatch }: {dispatch: any}) => (next: any) => (action: any) => {
    const { rest, method, body, query } = action.payload;
    if(!rest) {
        next(action);
        return;
    }

    let url = BASE_URL + rest;

    // TODO: handle query

    next({
        ...action,
        type: action.type + '_START',
    });

    fetch(url, {
        method,
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: action.payload.method === 'GET' ? undefined : JSON.stringify(action.payload.body),
    })
        .then(async response => {
            const data = await response.json();
            // TODO: Create action
        })
        .catch(error => {
            // TODO: Create action
        });
};

export default api;
