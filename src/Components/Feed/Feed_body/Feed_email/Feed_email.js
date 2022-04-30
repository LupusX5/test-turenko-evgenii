import React, { useEffect, useState } from 'react';
import './Feed_email.css';


const Feed_email = ({from, time, subject, attachment, isRead}) => {
    
    

    return (
      <div className={isRead?"feed-email":"feed-email__unread"}>
          <div className='feed-email__inner'>
              <div className='feed-email__top feed-email__row'>
                  <div className='feed_email__from'>{from}</div>
                  <div className='feed_email__time'>{time}</div>
              </div>
              <div className='feed-email__bottom feed-email__row'>
                  <div className='feed_email__subject'>{subject}</div>
                  <div className='feed_email__attachment'>{isRead.toString()}</div>
              </div>
          </div>
      </div>
    );
  }
  
  export default Feed_email;