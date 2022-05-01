import React, { useState } from 'react';
import './Feed_email.css';
import { useDispatch, useSelector } from 'react-redux';
import { addEmailBody } from '../../../../store/emailContentSlice';
import { viewEmailContent } from '../../../../store/emailStorageSlice';



const Feed_email = ({from, time, subject, attachment, isRead, index}) => {
    
    const [read, setRead] = useState(isRead)

    const emailContentBody = useSelector(state => state.emailContent.content);
    const emailIndex = useSelector(state => state.emailStorage.currentEmail);
    const dispatch = useDispatch();

    const readMessage = () => {
        setRead(true);
        dispatch(addEmailBody('djkfsdkfs'))
        dispatch(viewEmailContent(index))
    }

    return (
      <div className={read?"feed-email":"feed-email__unread"}>
          <div onClick={()=> {readMessage()}} className='feed-email__inner'>
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