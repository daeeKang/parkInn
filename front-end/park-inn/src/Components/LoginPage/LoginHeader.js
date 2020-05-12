import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Logo from '../Icons/parkinn_black.png';
import Link from '@material-ui/core/Link';
import AppBar from './HeaderStyles';
import Toolbar, { styles as toolbarStyles } from './Toolbar';
import './Login.css';

import { useAuth0 } from '../../react-auth0-spa';
import config from '../../auth_config.json';

const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function AppAppBar(props) {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isAuthenticated, loginWithRedirect, logout, getTokenSilently } = useAuth0();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <AppBar style={{ background: '#fff' }} position="fixed">
        <Toolbar className={classes.toolbar}>
            <div className={classes.left}>
                <a href="#parkinn">
                  <img src={Logo} height="80px" width="80px" padding="10px" alt="account-button" />
                </a>
            </div>
        
            {/* link back to home */}
            {/* <Link
                variant="h6"
                underline="none"
                color="inherit"
                className={classes.title}
            >
                {'ParkInn'}
            </Link> */}

            {/* <a href="#parkinn">
              <p id="logo">ParkInn</p>
            </a> */}

            {/* sign up buttons -- will change to responsive drawer l8r */}
            <div className={classes.right}>
                <ul className="landing-list">                  
                  <li className="landing-item"
                      onClick={() => loginWithRedirect({ redirect_uri: `${config.address}/dash`})}>
                        <p id="nav-link">Login</p>
                  </li>
                  <li className="landing-item"><a href="#features"><p id="nav-link">Features</p></a></li>
                  <li className="landing-item"><a href="#about"><p id="nav-link">About</p></a></li>
                </ul>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);