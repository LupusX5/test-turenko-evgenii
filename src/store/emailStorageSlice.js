import { createSlice } from "@reduxjs/toolkit";



const emailStorageSlice = createSlice({
    name: 'emailStorage',
    initialState: {
        unread: [],
        inbox: [],
        spam: [],
        deleted: [],
        currentFolder: 'inbox' // available folders: inbox/spam/deleted. Default folder: inbox.
    },
    reducers: {
        inboxSetter(state, action) {
            state.inbox = action.payload;
            console.log(state.inbox)
        }
    }
})

export default emailStorageSlice.reducer;

export const {inboxSetter} = emailStorageSlice.actions;
