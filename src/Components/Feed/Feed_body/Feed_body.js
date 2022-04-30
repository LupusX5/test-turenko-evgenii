import React, { useEffect, useState } from 'react';
import './Feed_body.css';
import { increment, decrement } from '../../../store/unreadEmailsSlice';


const Feed_body = () => {

    // replace by a different url if this one will be expired
    const apiUrl = 'https://8a7a7925-028a-4dcb-b408-785a0ddfec2a.mock.pstmn.io/emails'
  

    const [emails, setEmails] = useState(null)

    const mapper = (array) => {
      if(array!==null) {
        return array.map((item, id)=> {
          return <div key={id}>{item.subject}</div>
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
      </div>
    );
  }
  
  export default Feed_body;