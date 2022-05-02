import React, { useEffect } from 'react';
import './Feed_body.css';
import Feed_email from './Feed_email/Feed_email';
import { useDispatch, useSelector } from 'react-redux';
import { inboxSetter } from '../../../store/slices/emailStorageSlice';
import API from '../../../api/api';




const Feed_body = () => {
    const apiUrl = API.emails
    const emailStorageListDefault = useSelector(state => state.emailStorage.inbox);
    const emailStorageListDeleted = useSelector(state => state.emailStorage.deleted);
    const emailStorageListSpam = useSelector(state => state.emailStorage.spam);
    const emailStorageListCurrentFolder = useSelector(state => state.emailStorage.currentFolder);
    const searchQueryValue = useSelector(state => state.emailStorage.searchQuery);
    const searchSearchResult = useSelector(state => state.emailStorage.searchResult);
    const dispatch = useDispatch();

    
  

    const getCurrentFolder = (folder) => {
            /* 
                folders: 
                0 – filter by
                10 – inbox
                20 – spam
                30 – deleted
            */
      if(folder === (0 || 10)) {
        return emailStorageListDefault;
      } else if(folder === 20) {
        return emailStorageListSpam;
      } else if(folder === 30) {
        return emailStorageListDeleted;
      } else {
        return emailStorageListDefault;
      }
    }

    const getCurrentFolderName = (folder) => {
      /* 
          folders: 
          0 – filter by
          10 – inbox
          20 – spam
          30 – deleted
      */
  if(folder === (0 || 10)) {
    return 'Inbox';
  } else if(folder === 20) {
    return 'Spam';
  } else if(folder === 30) {
    return 'Deleted emails';
  } else {
    return 'Inbox';
  }
  }

    // mapping current array received from the state
    const mapper = (array) => {
      if(searchSearchResult.length===0 && searchQueryValue.length>0) {
        return <div className='feed-email__alert'><span>No matches were found for the query:<strong>&nbsp;{searchQueryValue}</strong></span></div>
      }else
      if(array.length===0) {
        return <div className='feed-email__alert'>{getCurrentFolderName(emailStorageListCurrentFolder)} folder is empty</div>
      } else
      if(array!==null) {
         return array.map((item, id)=> {
          return <Feed_email key={id} name={item.senderName} index={item.index} isRead={item.isReaded} from={item.from} subject={item.subject} attachments={item.attachements} time={item.date}/>
        })
      }
    }

    const fetchEmails = async(url) => {
      const response = await fetch(url);
      const emailsList = await response.json();
      return emailsList;
    };

    const modifyFetchedEmails = async(trigger) => {
      let array=[];
      for(let i = 0; i<trigger.length; i++) {
        let a = {
          ...trigger[i],
          index: (i + new Date().getTime())
        }
        array.unshift(a);
      }

      dispatch(inboxSetter(array));
      
    }

    useEffect(()=> {
      const asyncStack = async() => {
        const trigger = await fetchEmails(apiUrl);
        const target = await modifyFetchedEmails(trigger);
        
        setTimeout(asyncStack, 90000);
        return target;
      }

      asyncStack();
      
    }, [])

    /* 
      once a user writes at least one character, 
      the mapper function will switch the current array to an array with search results 
    */
    const handleSearch = (inputValue) => {
      if(inputValue.length>0) {
        return searchSearchResult;
      } else if(inputValue.length===0) {
        return getCurrentFolder(emailStorageListCurrentFolder);
      }
    }

    return (
      <div className="feed-body">
          {mapper(handleSearch(searchQueryValue))}
      </div>
    );
  }
  
  export default Feed_body;