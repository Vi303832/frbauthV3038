import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/States';

const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

export default store;
