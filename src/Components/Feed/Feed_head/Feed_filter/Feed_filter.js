import React from 'react';
import { Select } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles/index.js';
import InputLabel from '@mui/material/InputLabel/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';
import FormHelperText from '@mui/material/FormHelperText/index.js';
import FormControl from '@mui/material/FormControl/index.js';
import lamba from './images/bgdesk.jpg'
import './Feed_filter.css'


  



const Feed_filter = () => {
    
    const [option, setOption] = React.useState('');

    const handleChange = (event) => {
      setOption(event.target.value);
    };

    return (
      <React.Fragment>
        {/* <div className="feed-filter">
          <div className="feed-filter__button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <span>Filter by</span>
           <div className='feed-filter__arrows'>^</div>
          </div>
          <div id="myDropdown" class="dropdown-content">
            <div>Home</div>
            <div>About</div>
            <div>Contact</div>
          </div>
        </div> */}
      <FormControl sx={{ m: 1, minWidth: 120}} size='small'>
        <Select
          value={option}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>Filter by</em>
          </MenuItem>
          <MenuItem value={10}>Inbox</MenuItem>
          <MenuItem value={20}>Spam</MenuItem>
          <MenuItem value={30}>Deleted</MenuItem>
        </Select>
        </FormControl>

      </React.Fragment>
    );
  }
  
  export default Feed_filter;