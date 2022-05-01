import React, { useEffect, useState } from 'react';
import './Feed_body.css';
import Feed_email from './Feed_email/Feed_email';
import { useDispatch, useSelector } from 'react-redux';
import { inboxSetter } from '../../../store/emailStorageSlice';



const Feed_body = () => {

    const emailStorageListDefault = useSelector(state => state.emailStorage.inbox);
    const emailStorageListDeleted = useSelector(state => state.emailStorage.deleted);
    const emailStorageListSpam = useSelector(state => state.emailStorage.spam);
    const emailStorageListCurrentFolder = useSelector(state => state.emailStorage.currentFolder);
    
    const dispatch = useDispatch();

    // replace by a different url if this one will be expired
    const apiUrl = 'https://8a7a7925-028a-4dcb-b408-785a0ddfec2a.mock.pstmn.io/emails'
  

    const [emails, setEmails] = useState(null)

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

    const mapper = (array) => {
      if(array.length===0) {
        return <div className='feed-email__alert'>Inbox folder is empty</div>
      } else
      if(array!==null) {
         return array.map((item, id)=> {
          return <Feed_email key={id} index={item.index} isRead={item.isReaded} from={item.from} subject={item.subject}  time={item.date}/>
        })
      } 
    }

    const fetchEmails = async(url) => {
      const response = await fetch(url);
      const emailsList = await response.json()
      return emailsList;
    };


    const modifyFetchedEmails = async(trigger) => {
      let array=[];
      for(let i = 0; i<trigger.length; i++) {
        let a = {
          ...trigger[i],
          index: (i + new Date().getTime())
        }
        array.unshift(a)
      }

      dispatch(inboxSetter(array))
      
    }


    useEffect(()=> {
      const asyncStack = async() => {
        const trigger = await fetchEmails(apiUrl)
        const target = await modifyFetchedEmails(trigger)
        
        setTimeout(asyncStack, 90000)
        return target
      }

      asyncStack()
      
    }, [])

    return (
      <div className="feed-body">
          {mapper(getCurrentFolder(emailStorageListCurrentFolder))}
      </div>
    );
  }
  
  export default Feed_body;