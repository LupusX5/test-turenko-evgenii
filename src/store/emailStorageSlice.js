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
            // state.inbox = action.payload;
            state.inbox.unshift(...action.payload)
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
        },
        unreadEmailsCounter(state) {
            // in process
        },
        // sendToDeleted and sendToSpam may be unified if no change in functionality is expected
        sendToDeleted(state) {
            let targetIndex = state.currentEmailIndex;
            let deletedTargetCount = state.deleted.filter(field => field.index === targetIndex)
            if(deletedTargetCount.length===0) {
                state.deleted.unshift(...state.currentEmail[0])
            }
            removeByAttr(state.inbox, 'index', targetIndex)
            state.currentEmailIndex=0;
            state.currentEmail=[];
        },
        sendToSpam(state) {
            let targetIndex = state.currentEmailIndex;
            let spamTargetCount = state.spam.filter(field => field.index === targetIndex)
            if(spamTargetCount.length===0) {
                state.spam.unshift(...state.currentEmail[0])
            }
            removeByAttr(state.inbox, 'index', targetIndex)
            state.currentEmailIndex=0;
            state.currentEmail=[];
        }



    }
})

export default emailStorageSlice.reducer;

export const {inboxSetter, viewEmailContent, emailUnreader, unreadEmailsCounter, sendToDeleted, sendToSpam} = emailStorageSlice.actions;
