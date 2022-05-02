import React from 'react';
import './Email_content.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import paperclip from './icons/paperclip.svg'
import { emailUnreader, sendToDeleted, sendToSpam} from '../../../store/emailStorageSlice';
import { useDispatch, useSelector } from 'react-redux';

const ButtonRed = styled(Button)({
    backgroundColor: '#FC3401',
    color:'#F4F5F5',
    textTransform: 'none',
    fontFamily:[
        'Arial',
        'Helvetica',
        'sans-serif'
    ].join(','),
    fontSize: 12,
    '&:hover': {
        backgroundColor: '#FC340133',
        color:'#FC3401'
    }
})

const ButtonBlue = styled(Button)({
    backgroundColor: '#03B9ED',
    color:'#F4F5F5',
    textTransform: 'none',
    fontFamily:[
        'Arial',
        'Helvetica',
        'sans-serif'
    ].join(','),
    fontSize: 12,
    '&:hover': {
        backgroundColor: '#daedf2',
        color:'#03B9ED'
    }
})

const ButtonBlueLowerRightCornerRounded = styled(Button)({
    borderTopRightRadius:0,
    borderTopLeftRadius:0,
    borderBottomLeftRadius:0,
    backgroundColor: '#03B9ED',
    color:'#F4F5F5',
    textTransform: 'none',
    fontFamily:[
        'Arial',
        'Helvetica',
        'sans-serif'
    ].join(','),
    fontSize: 12,
    '&:hover': {
        backgroundColor: '#daedf2',
        color:'#03B9ED'
    }
})

const ButtonGreyOutlined = styled(Button)({
    backgroundColor: 'transparent',
    color:'#3B3D3F',
    borderColor:'#3B3D3F',
    textTransform: 'none',
    fontFamily:[
        'Arial',
        'Helvetica',
        'sans-serif'
    ].join(','),
    fontSize: 12,
    '&:hover': {
        borderColor:'#3B3D3F'
    }
})


const Email_content = ({index, from, body, tag, attachements}) => {
    const dispatch = useDispatch();
    



    return (
      <div className="email-content">
          <div className='email-content__head'>
              <div className='email-content__head--left'>
                  <Stack direction="row" spacing={2}>
                        <ButtonRed onClick={()=>{dispatch(sendToDeleted())}} size='small'>Delete</ButtonRed>
                    <ButtonGreyOutlined disabled={true} onClick={()=>{dispatch(sendToSpam())}} size="small" variant='outlined'>Spam</ButtonGreyOutlined>
                  </Stack>
              </div>
               <div className='email-content__head--right'>
                    <ButtonBlue onClick={()=> {dispatch(emailUnreader(index))}} size='small'>Mark as unread</ButtonBlue>
               </div>
          </div>
          <div className='email-content__body'>
              <h3 className='email-content__from'>{from}</h3>
              <div className='email-content__tags'>
                  <p className='email-content__tags-title'>Tags</p>
                  <ul className='email-content__tags-list'>
                      <li className='email-content__tag'>{tag}</li>
                  </ul>
              </div>
              <div className='email-content__main-container email-content-main-container'>
                    <div className='email-content-main-container__text-area'>
                        <p className='email-content-main-container__paragraph'>{body}</p>
                        </div>
                    <div className='email-content-main-container__footer'>
                        <div className='email-content-main-container__attachments'>
                            <img className='email-content-main-container__paperclip' src={paperclip}/>
                            {attachements.map((item, index) => {
                                return <div className='email-content-main-container__attachment' key={index}>
                                    <a href={item.file} target='_blank'>Attachment {index+1}</a>
                                </div>
                            })}
                        </div>
                        <ButtonBlueLowerRightCornerRounded>Reply</ButtonBlueLowerRightCornerRounded>
                    </div>
              </div>
          </div>
      </div>
    );
  }
  
  export default Email_content;