import React from 'react';
import './Feed.css';
import Feed_body from './Feed_body/Feed_body';
import Feed_head from './Feed_head/Feed_head.js';
import Feed_search from './Feed_search/Feed_search';


const Feed = () => {


    return (
      <div className="feed">
          <Feed_head/>
          <Feed_search/>
          <Feed_body/>
      </div>
    );
  }
  
  export default Feed;