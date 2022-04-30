import React, { useEffect, useState } from 'react';
import './Feed_body.css';
import { increment, decrement } from '../../../store/unreadEmailsSlice';
import Feed_email from './Feed_email/Feed_email';


const Feed_body = () => {

    // replace by a different url if this one will be expired
    const apiUrl = 'https://8a7a7925-028a-4dcb-b408-785a0ddfec2a.mock.pstmn.io/emails'
  

    const [emails, setEmails] = useState(null)


    const mapper = (array) => {
      if(array!==null) {
         return array.map((item, id)=> {
          return <Feed_email key={id} isRead={item.isReaded} from={item.from} subject={item.subject}  time={item.date}/>
        })
      }
    }

    const fetchEmails = async(url) => {
      const response = await fetch(url);
      const emailsList = await response.json();
      setEmails(emailsList)
      return emailsList;
    };


    useEffect(()=> {
      fetchEmails(apiUrl)
    }, [])
    
    console.log(emails)

    return (
      <div className="feed-body">
          {mapper(emails)}
          {/* {emails.map((item)=> {
          <Feed_email key={item.id} from={item.from} subject={item.subject} attachment={item.attachements} time={item.date}/>
        })} */}
      </div>
    );
  }
  
  export default Feed_body;