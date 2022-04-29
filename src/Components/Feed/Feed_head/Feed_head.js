import React from 'react';
import './Feed_head.css';
import { Badge } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles/index.js';
import Feed_filter from './Feed_filter/Feed_filter.js';
import { useDispatch, useSelector } from 'react-redux';
import lamba from './Feed_api/api.json'



const FeedHeadTheme = createTheme({
    palette: {
      primary: 
      {
          main:"#FC3401",
      },
    }
  });



const Feed_head = () => {
    
  const dispatch = useDispatch();
  const unreadEmailsCount = useSelector(state => state.unreadEmailsCount);



    return (
      <div className="feed-head">
          <div className="feed-head__left-side">
              <p className="feed-head__title">Inbox</p> 
              <ThemeProvider theme={FeedHeadTheme}>
                 <Badge color='primary' badgeContent={unreadEmailsCount.toString()} max={999}></Badge>
              </ThemeProvider>
          </div>
          <div className="feed-head__right-side">
              <Feed_filter/>
          </div>
      </div>
    );
  }
  
  export default Feed_head;