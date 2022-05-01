import React, { useEffect } from 'react';
import './Feed_head.css';
import { Badge } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Feed_filter from './Feed_filter/Feed_filter';
import { useDispatch, useSelector } from 'react-redux';
import { unreadEmailsCounter } from '../../../store/emailStorageSlice';



const FeedHeadTheme = createTheme({
    palette: {
      primary: 
      {
          main:"#FC3401",
      },
    }
  });



const Feed_head = () => {
  // const unreadEmailsCount = useSelector(state => state.unreadEmails.count);
  const unreadEmailsCount = useSelector(state => state.emailStorage.unread);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(unreadEmailsCounter())
  }, [])
  // dispatch(unreadEmailsCounter())


    return (
      <div className="feed-head">
          <div className="feed-head__left-side">
              <p className="feed-head__title">Inbox </p> 
              <ThemeProvider theme={FeedHeadTheme}>
                 <Badge color='primary' badgeContent={unreadEmailsCount.length.toString()} max={99}></Badge>
              </ThemeProvider>
          </div>
          <div className="feed-head__right-side">
              <Feed_filter/>
          </div>
      </div>
    );
  }
  
  export default Feed_head;