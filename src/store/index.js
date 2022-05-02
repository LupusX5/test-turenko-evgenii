import { combineReducers, configureStore } from '@reduxjs/toolkit';
import emailStorageSlice from './slices/emailStorageSlice';

const rootReducer = combineReducers({
    emailStorage: emailStorageSlice,
})

const store = configureStore({
    reducer: rootReducer
})


export default store;