import React from 'react';
import { Link } from 'react-router-dom';
import './UserItem.css';


const UserItem = (props) => {
  
      return (
        <div className="user-item-container">
          <Link to={`/users/${props.id}`}><span className="user-name">{props.name}</span></Link>

        </div>
      )
}

export default UserItem;