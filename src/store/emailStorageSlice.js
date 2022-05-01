import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

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
        currentEmailIndex: 0,
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
            let result = state.inbox.filter(field => field.index === target);
            if(state.currentEmail.length>0) {
                state.currentEmail = [];
                state.currentEmail.push(result);
                state.currentEmailIndex = result[0].index;
                result[0].isReaded = true;
            } else if(state.currentEmail.length===0) {
                state.currentEmail.push(result)
                state.currentEmailIndex = result[0].index;
                result[0].isReaded = true;
            }
        },
        emailUnreader(state) {
            let targetIndex = state.currentEmailIndex;
            let currentEmail = state.inbox.filter(field => field.index === targetIndex)
            currentEmail[0].isReaded=false;
            
        }

    }
})

export default emailStorageSlice.reducer;

export const {inboxSetter, viewEmailContent, emailUnreader} = emailStorageSlice.actions;
