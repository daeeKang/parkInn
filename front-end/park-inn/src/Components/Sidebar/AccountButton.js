import React from 'react';
import { NavLink } from 'react-router-dom';
import Pub from '../Icons/pub.jpg';
import './AccountButton.css';

export default props => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
            <div>
                <div class="center">
                    <p id="account-text">Welcome, User!</p>
                    <NavLink className="link" to="/management">
                        <img src={Pub} height="80px" width="80px" padding="10px" alt="account-button" />
                    </NavLink>
            </div>
        </div>
    )
}