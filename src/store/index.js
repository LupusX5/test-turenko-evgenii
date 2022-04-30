import { combineReducers, configureStore } from '@reduxjs/toolkit';
import unreadEmailsSlice from './unreadEmailsSlice';
import emailContentSlice from './emailContentSlice';
import emailStorageSlice from './emailStorageSlice';

const rootReducer = combineReducers({
    unreadEmails: unreadEmailsSlice,
    emailContent: emailContentSlice,
    emailStorage: emailStorageSlice,
})

const store = configureStore({
    reducer: rootReducer
})


export default store;