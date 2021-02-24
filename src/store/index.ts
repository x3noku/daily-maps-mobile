import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import api from './middlewares/api';

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware(), api]
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
