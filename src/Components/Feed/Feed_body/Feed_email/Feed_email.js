import React, { useState } from 'react';
import './Feed_email.css';
import { useDispatch, useSelector } from 'react-redux';
import { viewEmailContent } from '../../../../store/emailStorageSlice';
import paperClip from './../../../../icons/paperclip.svg';



const Feed_email = ({from, time, subject, attachments, isRead, index}) => {
    
    const emailIndex = useSelector(state => state.emailStorage.currentEmailIndex);
    const dispatch = useDispatch();


    const content = (trigger) => {
      if(trigger.length === 0) {
        return <></>
      } else if(trigger.length === 1) {
        let data = {
          ...trigger[0]
        };
        let target = data[0];
        console.log(target.attachements)
        return <Email_content from={target.from} body={target.body} tag={target.tag} attachements={target.attachements}/>
      }
    }

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


    //<div onClick={()=> {readMessage()}} id='feedEmailBasicBody' className={read?"feed-email keka":"feed-email__unread"}>

    return (
      <div onClick={()=> {readMessage()}} id='feedEmailBasicBody' className={highlightCurrentEmail(index, emailIndex)}>
          <div className='feed-email__inner'>
              <div className='feed-email__top feed-email__row'>
                  <div className='feed_email__from'>{from}</div>
                  <div className='feed_email__time'>{time}</div>
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