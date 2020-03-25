import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, MenuItem, Button } from '@material-ui/core';
import Pub from './pub.jpg';
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
            <div>
                <div class="center">
                    <p>Welcome, User!</p>
                    <Button aria-controls="simple-menu" aria-haspopup="true" disableRipple="true" className="account-button" onClick={handleClick}>
                        {/* <AccountCircleIcon style={{ padding: 10 }} fontSize="large" /> */}
                        <img src={Pub} height="80px" width="80px" alt="account-button" />
                    </Button>
                </div>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <NavLink className="link" to='/management'>
                        <MenuItem onClick={handleClose}>Account Settings</MenuItem>
                    </NavLink>
                    
                    <NavLink className="link" to="/">
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </NavLink>
                </Menu>
            </div>
        </div>
    )
}