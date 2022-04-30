import { createSlice } from "@reduxjs/toolkit";



const unreadEmailsSlice = createSlice({
    name: 'unreadEmails',
    initialState: {
        count:0,
        emails: []
    },
    reducers: {
        increment(state) {
            state.count = state.count + 1;
        },
        decrement(state) {
            state.count = state.count + 1;
        }
    }
})

export default unreadEmailsSlice.reducer;

export const {increment, decrement} = unreadEmailsSlice.actions;
