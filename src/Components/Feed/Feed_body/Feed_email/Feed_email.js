import React, { useState } from 'react';
import './Feed_email.css';
import { useDispatch, useSelector } from 'react-redux';
import { viewEmailContent } from '../../../../store/emailStorageSlice';
import paperClip from './../../../../icons/paperclip.svg';



const Feed_email = ({from, time, subject, attachments, isRead, index}) => {
    
    const emailIndex = useSelector(state => state.emailStorage.currentEmailIndex);
    const dispatch = useDispatch();

    function highlightCurrentEmail(currentIndex, stateCurrentIndex) {

        if(currentIndex === stateCurrentIndex && isRead) {
            return 'feed-email__current feed-email__read'
        } else if(currentIndex !== stateCurrentIndex && isRead) {
            return 'feed-email__read'
        } else if(currentIndex !== stateCurrentIndex && !isRead) {
            return 'feed-email__unread'
        } else if(currentIndex === stateCurrentIndex && !isRead) {
            return 'feed-email__unread feed-email__current'
        }
    }


    const displayAttachmentsIcon = (arr) => {
      if(arr && arr.length>0){
        return <img className='feed_email__attachment' src={paperClip}/>
      } else {
        return <></>
      }
    }

    const readMessage = () => {
        dispatch(viewEmailContent(index))
    }


    return (
      <div onClick={()=> {readMessage()}} id='feedEmailBasicBody' className={highlightCurrentEmail(index, emailIndex)}>
          <div className='feed-email__inner'>
              <div className='feed-email__top feed-email__row'>
                  <div className='feed_email__from'>{from}</div>
                  {/*edited to match the original ui. Original value: {time}*/}
                  <div className='feed_email__time'>{new Date(index-1).toLocaleTimeString([],{hour12:true, hour: '2-digit', minute:'2-digit'})}</div>
              </div>
              <div className='feed-email__bottom feed-email__row'>
                  <div className='feed_email__subject'>{subject}</div>
                  {displayAttachmentsIcon(attachments)}
              </div>
          </div>
      </div>
    );
  }
  
  export default Feed_email;