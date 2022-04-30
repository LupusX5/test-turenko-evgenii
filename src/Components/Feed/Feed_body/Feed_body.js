import React, { useEffect, useState } from 'react';
import './Feed_body.css';
import Feed_email from './Feed_email/Feed_email';
import { useDispatch, useSelector } from 'react-redux';
import { inboxSetter } from '../../../store/emailStorageSlice';



const Feed_body = () => {

    const emailStorageList = useSelector(state => state.emailStorage.inbox);
    const dispatch = useDispatch();

    // replace by a different url if this one will be expired
    const apiUrl = 'https://8a7a7925-028a-4dcb-b408-785a0ddfec2a.mock.pstmn.io/emails'
  

    const [emails, setEmails] = useState(null)


    const mapper = (array) => {
      if(array!==null) {
        console.log(array.length)
         return array.map((item, id)=> {
          return <Feed_email key={id} isRead={item.isReaded} from={item.from} subject={item.subject}  time={item.date}/>
        })
      } else if(array === null || array.length===0) {
          
          return <div className='feed-email__alert'>Emails are being loaded...</div>
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
          index: i
        }
        array.push(a)
      }

      dispatch(inboxSetter(array))
    }


    useEffect(()=> {
      const asyncStack = async() => {
        const trigger = await fetchEmails(apiUrl)
        const target = await modifyFetchedEmails(trigger)
      }

      asyncStack()
      
    }, [])

    return (
      <div className="feed-body">
          {mapper(emailStorageList)}
      </div>
    );
  }
  
  export default Feed_body;