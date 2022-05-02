import React from 'react';
import './Email_box.css';
import Email_content from './Email_content/Email_content';
import { useSelector } from 'react-redux';


const Email_box = () => {
  const emailIndex = useSelector(state => state.emailStorage.currentEmail);

  const content = (trigger) => {
    if(trigger.length === 0) {
      return <></>
    } else if(trigger.length === 1) {
      let data = {
        ...trigger[0]
      };
      let target = data[0];
      return <Email_content  index={target.index} name={target.senderName} from={target.from} body={target.body} tag={target.tag} attachements={target.attachements}/>
    }
  }

    return (
      <div className="email-box">
          {content(emailIndex)}
      </div>
    );
  }
  
  export default Email_box;