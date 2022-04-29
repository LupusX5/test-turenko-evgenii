import React from 'react';
import './Feed_body.css';


const Feed_body = () => {

    // replace by a different url if this one will be expired
    const apiUrl = 'https://8a7a7925-028a-4dcb-b408-785a0ddfec2a.mock.pstmn.io/emails'
  
    const fetchEmails = async(url) => {
      const response = await fetch(url);
      const emailsList = await response.json();
      console.log(emailsList)
      return emailsList;
    };
  
    fetchEmails(apiUrl)

    return (
      <div className="feed-body">
          sajdk
          
      </div>
    );
  }
  
  export default Feed_body;