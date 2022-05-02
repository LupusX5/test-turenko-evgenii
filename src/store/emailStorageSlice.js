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


const setUnreadEmailsCount = async(state) => {
    let unreadInbox = state.inbox.filter(field => field.isReaded === false);
    let unreadSpam = state.spam.filter(field => field.isReaded === false);
    let unreadDeleted = state.deleted.filter(field => field.isReaded === false);

    let result = unreadInbox.length+unreadSpam.length+unreadDeleted.length;

    state.unread = result;
}

const emailStorageSlice = createSlice({
    name: 'emailStorage',
    initialState: {
        currentEmailIndex: 0,
        currentEmail: [],
        unread: 0,
        inbox: [],
        spam: [],
        deleted: [],
        currentFolder: 0 // available folders: inbox/spam/deleted. Default folder: inbox.
    },
    reducers: {
        resetCurrentEmail(state){
            state.currentEmailIndex = 0;
            state.currentEmail = [];

            setUnreadEmailsCount(state);
        },
        setCurrentFolder(state, action){
            /* 
                folders: 
                payload = 0 – filter by
                payload = 10 – inbox
                payload = 20 – spam
                payload = 20 – deleted
            */
            state.currentFolder = action.payload

            setUnreadEmailsCount(state);
        },
        inboxSetter(state, action) {
            // state.inbox = action.payload;
            state.inbox.unshift(...action.payload)
            setUnreadEmailsCount(state);
        },
        viewEmailContent(state, action) {
            let currentFolder = state.currentFolder;
            let target = action.payload;
            let result;
            
            if(currentFolder === (0 || 10)) {
                result = state.inbox.filter(field => field.index === target);
            } else if(currentFolder === 20) {
                result = state.spam.filter(field => field.index === target);
            } else if(currentFolder === 30) {
                result = state.deleted.filter(field => field.index === target);
            } else {
                result = state.inbox.filter(field => field.index === target);
            }
            
            if(state.currentEmail.length>0) {
                state.currentEmail = [];
                state.currentEmail.push(result);
                state.currentEmailIndex = result[0].index;
                result[0].isReaded = true;
            } else if(state.currentEmail.length===0) {
                state.currentEmail.push(result);
                state.currentEmailIndex = result[0].index;
                result[0].isReaded = true;
            }
            setUnreadEmailsCount(state);
        },
        emailUnreader(state) {
            let currentFolder = state.currentFolder;
            let targetIndex = state.currentEmailIndex;
            let targetEmail;

            if(currentFolder === (0 || 10)) {
                targetEmail = state.inbox.filter(field => field.index === targetIndex);
            } else if(currentFolder === 20) {
                targetEmail = state.spam.filter(field => field.index === targetIndex);
            } else if(currentFolder === 30) {
                targetEmail = state.deleted.filter(field => field.index === targetIndex);
            } else {
                targetEmail = state.inbox.filter(field => field.index === targetIndex);
            }
            
            targetEmail[0].isReaded=false;
            state.currentEmail=[];
            state.currentEmail.push(targetEmail);

            setUnreadEmailsCount(state);
        },
        // sendToDeleted and sendToSpam may be unified if no change in functionality is expected
        sendToDeleted(state) {
            let targetIndex = state.currentEmailIndex;
            let deletedTargetCount = state.deleted.filter(field => field.index === targetIndex);
            if(deletedTargetCount.length===0) {
                state.deleted.unshift(...state.currentEmail[0]);
            }
            removeByAttr(state.inbox, 'index', targetIndex);
            state.currentEmailIndex=0;
            state.currentEmail=[];

            setUnreadEmailsCount(state);
        },
        sendToSpam(state) {
            let targetIndex = state.currentEmailIndex;
            let spamTargetCount = state.spam.filter(field => field.index === targetIndex);
            if(spamTargetCount.length===0) {
                state.spam.unshift(...state.currentEmail[0]);
            }
            removeByAttr(state.inbox, 'index', targetIndex)
            state.currentEmailIndex=0;
            state.currentEmail=[];

            setUnreadEmailsCount(state);
        }
    }
})

export default emailStorageSlice.reducer;

export const {inboxSetter, viewEmailContent, emailUnreader, sendToDeleted, sendToSpam, setCurrentFolder, resetCurrentEmail} = emailStorageSlice.actions;
