import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '../../react-auth0-spa';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Sidebar from '../Sidebar/Sidebar';
import config from '../../auth_config.json';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default props => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const { isAuthenticated, loginWithRedirect, logout, getTokenSilently } = useAuth0();
    // const handleClick = event => {
    //   setAnchorEl(event.currentTarget);
    // };
  
    // const handleClose = () => {
    //   setAnchorEl(null);
    // };

    const logoutWithRedirect = () =>
    logout({
      returnTo: config.address,
    });

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
                <button className="acc-btn" onClick={handleClickOpen}>
                    <AccountCircleIcon fontSize="large" />
                </button>

                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        <h1 className="acc-title">
                            {"Logout now?"}
                        </h1>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <h1 className="acc-title acc-sub">
                                You will be taken back ParkInn's home page.<br/>
                            </h1>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button className="acc-link" autoFocus onClick={handleClose}>
                            No
                        </button>
                        <button className="acc-link acc-log" onClick={() => logoutWithRedirect()} to='/' autoFocus>
                            Logout
                        </button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}