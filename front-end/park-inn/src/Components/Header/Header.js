import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default props => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div class="header">
            <div class="header-right">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <AccountCircleIcon style={{ padding: 10 }} fontSize="large" />
                </Button>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Account Settings</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    )
}