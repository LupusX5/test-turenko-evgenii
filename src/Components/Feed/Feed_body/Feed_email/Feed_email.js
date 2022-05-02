import React from 'react';
import './Feed_email.css';
import { useDispatch, useSelector } from 'react-redux';
import { viewEmailContent } from '../../../../store/slices/emailStorageSlice';
import paperClip from './../../../../icons/paperclip.svg';



const Feed_email = ({from, time, subject, attachments, isRead, index, name}) => {
    
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

     //  formatting time in the right way. 
     //  Alternatively, to avoid this construction, I'd offer to get time as a unix timestamp
    const formatTime = (string) => {
        const hoursFrom24To12 = (hour) => {
            let result
            if(+hour<12 && +hour>10) {
                return hour;
            } else if(+hour<10) {
                return `0${hour}`;
            }
            switch(+hour) {
                case +hour<12:
                    result=hour;
                    break;
                case 13:
                    result = '01';
                    break;
                case 14:
                    result = '02';
                    break;
                case 15:
                    result = '03';
                    break;
                case 16:
                    result = '04';
                    break;
                case 17:
                    result = '05';
                    break;
                case 18:
                    result = '06';
                    break;
                case 19:
                    result = '07';
                    break;
                case 20:
                    result = '08';
                    break;
                case 21:
                    result = '09';
                    break;
                case 22:
                    result = '10';
                    break;
                case 23:
                    result = '11';
                    break;
                case 24:
                    result = '12';
                    break;
                case parseInt('00'):
                    result = '12';
                    break;
            }

            return result;
        }

        const hours24toPMAndAM = (hour) => {
            if(+hour>=12) {
                return 'pm';
            } else if(+hour<12) {
                return 'am';
            }
        } 

        if(string.length>0) {
            if(string.includes(' ')){
                let array = string.split(' ');
                if(array.length === 2) {
                    if(array[1].includes(':')) {
                        let timeArray = array[1].split(':')
                        let hours = timeArray[0]
                        let minutes = timeArray[1]
                        return <div className='feed_email__time'>{hoursFrom24To12(hours)}:{minutes} {hours24toPMAndAM(hours)}</div>
                    } 
                }
                
            } else {
                return <div className='feed_email__time'>{string}</div>
            }
        } 
    }


    return (
      <div onClick={()=> {readMessage()}} id='feedEmailBasicBody' className={highlightCurrentEmail(index, emailIndex)}>
          <div className='feed-email__inner'>
              <div className='feed-email__top feed-email__row'>
                  <div className='feed_email__from'>{name}</div>
                  {/* Expected unix timestamp. Original code: new Date(index-1).toLocaleTimeString([],{hour12:true, hour: '2-digit', minute:'2-digit'}) */}
                  {formatTime(time)}
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