import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { useAuth0 } from '../../react-auth0-spa';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Sidebar from '../Sidebar/Sidebar';


export default props => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { isAuthenticated, loginWithRedirect, logout, getTokenSilently } = useAuth0();
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    //This is just to show how to make API requests with the token
    //TO DO: Remove Later
    const apiRequest = async () => {
        // Just "token = await getTokenSilently()" is fine but wanted to make sure that API is checking the token
        const token = isAuthenticated ? await getTokenSilently() : 1;   
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8000/Company/GetCompany/MGM');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        console.log(xhr);
        xhr.send();
    }

    return (
        <div class="header">
            <Sidebar />
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
                    {!isAuthenticated && ( <MenuItem onClick={() => loginWithRedirect({})}>Log in</MenuItem>)}
                    <NavLink className="link" to='/management'>
                        <MenuItem onClick={handleClose}>Account Settings</MenuItem>
                    </NavLink>
                    {isAuthenticated && <MenuItem onClick={() => logout()}>Logout</MenuItem>}
                    <MenuItem onClick={apiRequest}>API Request</MenuItem>
                </Menu>
            </div>
        </div>
    )
}