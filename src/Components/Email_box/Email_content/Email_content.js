import React from 'react';
import './Email_content.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import paperclip from './icons/paperclip.svg'
import { emailUnreader, unreadEmailsCounter, emailDeleter } from '../../../store/emailStorageSlice';
import { useDispatch, useSelector } from 'react-redux';




const Email_content = ({index, from, body, tag, attachements}) => {
    const dispatch = useDispatch();
    

    const ButtonRed = styled(Button)({
        backgroundColor: '#FC3401',
        color:'#F4F5F5',
        textTransform: 'none',
        fontFamily:[
            'Arial',
            'Helvetica',
            'sans-serif'
        ],
        fontSize: 12,
    })

    const ButtonBlue = styled(Button)({
        backgroundColor: '#03B9ED',
        color:'#F4F5F5',
        textTransform: 'none',
        fontFamily:[
            'Arial',
            'Helvetica',
            'sans-serif'
        ],
        fontSize: 12,
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
        ],
        fontSize: 12,
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
        ],
        fontSize: 12,
    })

    return (
      <div className="email-content">
          <div className='email-content__head'>
              <div className='email-content__head--left'>
                  <Stack direction="row" spacing={2}>
                        <ButtonRed size='small'>Delete</ButtonRed>
                    <ButtonGreyOutlined onClick={()=>{dispatch(emailDeleter())}} size="small" variant='outlined'>Spam</ButtonGreyOutlined>
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
                                return <div key={index}>
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