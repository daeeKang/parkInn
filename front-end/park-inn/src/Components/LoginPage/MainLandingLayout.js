import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import Test from './phone_transparent.png';
import Desktop from './hello.png';
import Arrow from './arrow_down.svg';

import { useAuth0 } from '../../react-auth0-spa';
import config from '../../auth_config.json';

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '80vh',
      minHeight: 500,
      maxHeight: 1300,
    },
  },
  containerRight: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'right',
    justifyItems: 'right',
  },
  containerLeft: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(35),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyItems: 'right',
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
  },
  arrowDown: {
    position: 'absolute',
    bottom: theme.spacing(4),
  },
});

function MainLandingLayout(props) {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isAuthenticated, loginWithRedirect, logout, getTokenSilently } = useAuth0();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <a name="parkinn">
    <div className="landing">
    <Container>
      <br/><br/>
      <GridContainer spacing={3}>
        <GridItem sm={12} xs={12} md={6} lg={6}>
          {/* this is transparent phone img */}
          <div className="landing-product">
            <img src={Desktop} height="450px" width="450px" alt="phones" />
          </div>

          {/* this was custom for non-transparent images */}
          {/* <img src={Phones} height="600px" width="900px" alt="phones" /> */}
        </GridItem>

        <GridItem sm={12} xs={12} md={6} lg={6}>
          <Container className={classes.containerLeft}>
            {/* <div class="fade-in-title"> */}
            {/* <h1 id="landing-title">Welcome to <font color="#366387">ParkInn</font></h1> */}
            <h1 id="landing-title">Welcome to <font color="#adc9e0">ParkInn</font></h1>
            {/* </div> */}

            <div class="fade-in-subtitle">
              <p id="landing-subtitle">The parking management software that allows you to manage, monetize, and enforce parking reservations with ease.</p>
            </div>
            <br/>

            <div>
              {/* {!isAuthenticated && ( <button className="landing-button" onClick={() => loginWithRedirect({
                  redirect_uri: `${config.address}/dash`
              })}>Log in ></button>)}

              {!isAuthenticated && ( <button className="landing-button" onClick={() => loginWithRedirect({
                  redirect_uri: `${config.address}/dash`
              })}>Sign up ></button>)} */}

              <button className="landing-button" onClick={() => loginWithRedirect({
                  redirect_uri: `${config.address}/dash`
              })}>Log in ></button>

              <button className="landing-button" onClick={() => loginWithRedirect({
                  redirect_uri: `${config.address}/dash`
              })}>Sign up ></button>
              <br /><br /><br /><br />
            </div>
            <br/><br/><br/>
            <div id="learn-more">
              <a href="#about">
                <p id="landing-link">
                  <img src={Arrow} className="next" height="20px" width="20px" fill="gray" alt="next" /><span className="tab">Learn More</span>
                </p>
              </a>
            </div>
            </Container>
          </GridItem>
      </GridContainer>
    </Container>
    </div>
    </a>
  );
}

MainLandingLayout.propTypes = {
  backgroundClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLandingLayout);