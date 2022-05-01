import { createSlice } from "@reduxjs/toolkit";

const removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 
           arr.splice(i,1);
       }
    }
    return arr;
}

const emailStorageSlice = createSlice({
    name: 'emailStorage',
    initialState: {
        currentEmail: [],
        unread: [],
        inbox: [],
        spam: [],
        deleted: [],
        currentFolder: 'inbox' // available folders: inbox/spam/deleted. Default folder: inbox.
    },
    reducers: {
        inboxSetter(state, action) {
            state.inbox = action.payload;
        },

        viewEmailContent(state, action) {
            let target = action.payload;
            let result = state.inbox.filter(field => field.index === target)
            if(state.currentEmail.length>0) {
                state.currentEmail = [];
                state.currentEmail.push(result)
                console.log(state.currentEmail)
            } else if(state.currentEmail.length===0) {
                state.currentEmail.push(result)
                console.log(state.currentEmail)
            }
        }

    }
})

export default emailStorageSlice.reducer;

export const {inboxSetter, viewEmailContent} = emailStorageSlice.actions;
