import React from 'react';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import './Feed_filter.css';
import { setCurrentFolder } from '../../../../store/emailStorageSlice';
import { useDispatch } from 'react-redux';

  



const Feed_filter = () => {
    const dispatch = useDispatch();
    const [option, setOption] = React.useState(0);

    const handleChange = (event) => {
      setOption(event.target.value);
      dispatch(setCurrentFolder(event.target.value))
    };

    return (
      <React.Fragment>
      <FormControl sx={{ m: 1, minWidth: 110}} size='small'>
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