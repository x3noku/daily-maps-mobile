import Config from 'react-native-config';

const BASE_URL = Config.URL;

const api = ({ dispatch }: {dispatch: any}) => (next: any) => (action: any) => {
    const { rest, method, data } = action.payload;
    const { token } = data;
    if(!rest) {
        next(action);
        return;
    }

    let url = BASE_URL + rest;
    next({
        ...action,
        type: action.type + '_START',
    });

    console.log(url);
    fetch(url, {
        method,
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Bearer': token
        },
        body: method === 'GET' ? undefined : JSON.stringify(data),
    })
        .then(async response => {
            const data = await response.json();
            console.log(data);
            if(response.status === 200 && data.success)
                next({
                    type: action.type + '_SUCCESS',
                    payload: data.response
                });
            else
                next({
                    type: action.type + '_FAIL',
                    payload: data.error
                });
        })
        .catch(error => {
            console.log(error);
            next({
                type: action.type + '_FAIL',
                payload: {message: error.toString()}
            });
        });
};

export default api;
