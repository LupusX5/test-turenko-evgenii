import { combineReducers, configureStore } from '@reduxjs/toolkit';
import unreadEmailsSlice from './unreadEmailsSlice';

const rootReducer = combineReducers({
    unreadEmails: unreadEmailsSlice
})

const store = configureStore({
    reducer: rootReducer
})


export default store;