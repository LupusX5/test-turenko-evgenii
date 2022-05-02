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


const  getUniqueArrayValues = (arr) => {
    let finalArray = [];
    for (let i=0, l=arr.length; i<l; i++)
        if (finalArray.indexOf(arr[i]) === -1 && arr[i] !== '')
        finalArray.push(arr[i]);
    return finalArray;
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
        searchQuery: '',
        searchResult: [],
        currentEmailIndex: 0,
        currentEmail: [],
        unread: 0,
        inbox: [],
        spam: [],
        deleted: [],
        currentFolder: 0 // available folders: default(0)/inbox(10)/spam(20)/deleted(30).
    },
    reducers: {
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;

            let currentFolder = state.currentFolder;
            let searchDirectory;

            // identify current folder
            if(currentFolder === 0 || currentFolder === 10) {
                searchDirectory = state.inbox;
            } else if(currentFolder === 20) {
                searchDirectory = state.spam;
            } else if(currentFolder === 30) {
                searchDirectory = state.deleted;
            } else {
                searchDirectory = state.inbox;
            }


            if(state.searchQuery.length>0) {
                let searchBySender = searchDirectory.filter(field => {return field.senderName.toLowerCase().match(state.searchQuery.toLowerCase())});
                let searchBySubject = searchDirectory.filter(field => {return field.subject.toLowerCase().match(state.searchQuery.toLowerCase())});
                let middleArray = [...searchBySender, ...searchBySubject];
      
                state.searchResult = [...getUniqueArrayValues(middleArray)];
            } if(state.searchQuery.length===0) {
                state.searchResult = [];
            }
        },
        resetCurrentEmail(state){
            state.currentEmailIndex = 0;
            state.currentEmail = [];

            setUnreadEmailsCount(state);
        },
        setCurrentFolder(state, action){
            /* 
                folders: 
                payload = 0 – filter by ==== inbox
                payload = 10 – inbox
                payload = 20 – spam
                payload = 30 – deleted
            */
            state.currentFolder = action.payload;

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
            

            // identify current folder id
            if(currentFolder === 0 || currentFolder === 10) {
                result = state.inbox.filter(field => field.index === target);
            } else if(currentFolder === 20) {
                result = state.spam.filter(field => field.index === target);
            } else if(currentFolder === 30) {
                result = state.deleted.filter(field => field.index === target);
            } else {
                result = state.inbox.filter(field => field.index === target);
            }
            
            // view and read the email
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

            // identify current folder id
            if(currentFolder === 0 || currentFolder === 10) {
                targetEmail = state.inbox.filter(field => field.index === targetIndex);
            } else if(currentFolder === 20) {
                targetEmail = state.spam.filter(field => field.index === targetIndex);
            } else if(currentFolder === 30) {
                targetEmail = state.deleted.filter(field => field.index === targetIndex);
            }
            
            // mark as unread
            targetEmail[0].isReaded=false;
            state.currentEmail=[];
            state.currentEmail.push(targetEmail);

            setUnreadEmailsCount(state);
        },
        // sendToDeleted and sendToSpam may be unified if no change in functionality is expected
        sendToDeleted(state) {
            let targetIndex = state.currentEmailIndex;
            let deletedTargetCount = state.deleted.filter(field => field.index === targetIndex);

            // verify that there are no duplicates of the target letter in the target folder
            if(deletedTargetCount.length===0) {
                state.deleted.unshift(...state.currentEmail[0]);
            }
            
            // identify current folder and delete the target letter from the current folder
            if(state.currentFolder === 0|| state.currentFolder === 10) {
                removeByAttr(state.inbox, 'index', targetIndex);
            }   else if(state.currentFolder === 20) {
                removeByAttr(state.spam, 'index', targetIndex);
            }
            
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

            removeByAttr(state.inbox, 'index', targetIndex);
            state.currentEmailIndex=0;
            state.currentEmail=[];

            setUnreadEmailsCount(state);
        }
    }
})

export default emailStorageSlice.reducer;

export const {inboxSetter, viewEmailContent, emailUnreader, sendToDeleted, sendToSpam, setCurrentFolder, resetCurrentEmail, setSearchQuery} = emailStorageSlice.actions;
