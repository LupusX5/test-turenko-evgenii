import React from 'react';
import Email_box from '../Email_box/Email_box.js';
import Feed from '../Feed/Feed.js';
import './Skeleton.css';


const Skeleton = () => {

    return (
      <div className="skeleton">
        <Feed/>
        <Email_box/>
      </div>
    );
  }
  
  export default Skeleton;