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
    
    const [option, setOption] = React.useState(0);

    const handleChange = (event) => {
      setOption(event.target.value);
    };

    return (
      <React.Fragment>
      <FormControl sx={{ m: 1, minWidth: 120}} size='small'>
        <Select
          value={option}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value={0}>
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