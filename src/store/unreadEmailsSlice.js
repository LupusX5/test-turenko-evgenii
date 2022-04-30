import { createSlice } from "@reduxjs/toolkit";



const unreadEmailsSlice = createSlice({
    name: 'unreadEmails',
    initialState: {
        count:0,
        emails: []
    },
    reducers: {
        increment(state, action) {
            state.count = state.count + action.payload;
        },
        unshiftToUnread(state) {
            state.emails = state.emails.unshift(action.payload);
        }
    }
})

export default unreadEmailsSlice.reducer;

export const {increment, decrement} = unreadEmailsSlice.actions;
