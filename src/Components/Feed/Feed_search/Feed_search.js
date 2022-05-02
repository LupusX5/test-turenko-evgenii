import React from 'react';
import './Feed_search.css';
import searchIcon from './icons/search-icon/icons8-search-50.svg'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../../store/emailStorageSlice';


const Feed_search = () => {
  const dispatch = useDispatch();


    const setQuery = (event) => {
      event.preventDefault()
      dispatch(setSearchQuery(event.target.value))
    }

    return (
      <div className="feed-search">
          <div className='feed-search__inner'>
              <input onChange={setQuery} className='feed-search__search' placeholder='Search'/>
              <img className='feed-search__icon' src={searchIcon}/>
          </div>
      </div>
    );
  }
  
  export default Feed_search;