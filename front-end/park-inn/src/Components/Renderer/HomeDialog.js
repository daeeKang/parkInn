import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import './Renderer.css';
import { NavLink } from 'react-router-dom';
import Home from './home.svg';

export default function HomeDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <button className="home" onClick={handleClickOpen}><img src={Home} height="22px" width="22px" /></button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">
          <h1 className="acc-title">
            {"Do you wish to go back to the dashboard?"}
          </h1>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="acc-title acc-sub">
            <h1 className="acc-title acc-sub">
              If you do not manually save before exiting the parking lot designer,
              all of your changes will be lost. Continue editing if you wish to save your changes.
            </h1>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="dial stay" onClick={handleClose}>
            Keep Editing
          </button>
          {/* <button className="dial" onClick={handleClose}>
            <NavLink className="bruh" to="/dash">Go Home</NavLink>
          </button> */}
          <NavLink className="bruh" to="/dash">
            <button className="dial" onClick={handleClose}>
              Go Home
            </button>
          </NavLink>
        </DialogActions>
      </Dialog>
    </div>
  );
}