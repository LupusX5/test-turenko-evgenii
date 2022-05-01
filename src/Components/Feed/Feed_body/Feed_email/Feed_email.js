import React, { useState } from 'react';
import './Feed_email.css';
import { useDispatch, useSelector } from 'react-redux';
import { addEmailBody } from '../../../../store/emailContentSlice';
import { viewEmailContent } from '../../../../store/emailStorageSlice';



const Feed_email = ({from, time, subject, attachment, isRead, index}) => {
    
    const [read, setRead] = useState(isRead)

    const emailContentBody = useSelector(state => state.emailContent.content);
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
        let target = document.getElementById('feedEmailBasicBody')

        // console.log('this', currentIndex)
        // console.log('global', stateCurrentIndex)
        if(currentIndex === stateCurrentIndex) {
            
                return 'feed-email__current feed-email'
        } else {
            return 'feed-email__unread'
        }

        // return 'feed-email__unread'
    }

    const readMessage = () => {
        setRead(true);
        dispatch(addEmailBody('djkfsdkfs'))
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
                  <div className='feed_email__attachment'>{isRead.toString()}</div>
              </div>
          </div>
      </div>
    );
  }
  
  export default Feed_email;