import React from 'react';
import Email_body from '../Email_body/Email_body.js';
import Feed from '../Feed/Feed.js';
import './Skeleton.css';


const Skeleton = () => {

    return (
      <div className="skeleton">
        <Feed/>
        <Email_body/>
      </div>
    );
  }
  
  export default Skeleton;