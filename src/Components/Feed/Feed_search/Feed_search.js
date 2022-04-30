import React from 'react';
import './Feed_search.css';
import { Input } from '@mui/material';
import { InputAdornment } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import searchIcon from './icons/search-icon/icons8-search-50.svg'


const Feed_search = () => {


    return (
      <div className="feed-search">
          <div className='feed-search__inner'>
              <input className='feed-search__search' placeholder='Search'/>
              <img className='feed-search__icon' src={searchIcon}/>
          </div>
      </div>
    );
  }
  
  export default Feed_search;