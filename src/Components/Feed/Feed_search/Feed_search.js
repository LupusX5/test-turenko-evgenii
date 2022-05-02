import React from 'react';
import './Feed_search.css';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../../store/slices/emailStorageSlice';
import magnifyingGlass from '../../../icons/magnifying-glass.svg'


const Feed_search = () => {
  const dispatch = useDispatch();


    const setQuery = (event) => {
      event.preventDefault();
      dispatch(setSearchQuery(event.target.value));
    }

    const focusOnInput = () => {
      document.getElementById('feedSearchField').focus();
    }

    return (
      <div className="feed-search">
          <div className='feed-search__inner'>
              <input type='text' onChange={setQuery} id='feedSearchField' className='feed-search__search' placeholder='Search'/>
              <img onClick={()=>{focusOnInput()}} className='feed-search__icon' src={magnifyingGlass}/>
          </div>
      </div>
    );
  }
  
  export default Feed_search;