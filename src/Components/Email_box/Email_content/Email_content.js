import React from 'react';
import './Email_content.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';




const Email_content = () => {

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
                    <ButtonGreyOutlined size="small" variant='outlined'>Spam</ButtonGreyOutlined>
                  </Stack>
              </div>
               <div className='email-content__head--right'>
                    <ButtonBlue size='small'>Mark as unread</ButtonBlue>
               </div>
          </div>
          <div className='email-content__body'>
              <h3 className='email-content__from'>From Person</h3>
              <div className='email-content__tags'>
                  <p className='email-content__tags-title'>Tags</p>
                  <ul className='email-content__tags-list'>
                      <li className='email-content__tag'>tag1</li>
                      <li className='email-content__tag'>tag2</li>
                  </ul>
              </div>
              <div className='email-content__main-container email-content-main-container'>
                    <div className='email-content-main-container__text'></div>
                    <div className='email-content-main-container__footer'>
                        <div className='email-content-main-container__attachments'></div>
                        <ButtonBlueLowerRightCornerRounded>Reply</ButtonBlueLowerRightCornerRounded>
                    </div>
              </div>
          </div>
      </div>
    );
  }
  
  export default Email_content;