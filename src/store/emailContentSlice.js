import { createSlice } from "@reduxjs/toolkit";



const emailContentSlice = createSlice({
    name: 'emailContent',
    initialState: {
        count:0,
        content: null
    },
    reducers: {
        addEmailBody(state, action) {
            state.content = action.payload;
        }
    }
})

export default emailContentSlice.reducer;

export const {addEmailBody} = emailContentSlice.actions;
