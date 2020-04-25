import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import Phones from './3fonez.png';
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
    // <section className={classes.root}>
    //     <Container className={classes.container}>
    //         <div className="landing">
    //             <p>hi</p>
    //         </div>
    //         <p id="logo">Login | Signup</p>
    //     </Container>

    //     <Container className={classes.containerLeft}>
    //         <p id="landing-text">use our app bitch</p>
    //         <p id="landing-text">pls</p>
    //     </Container>
    // </section>

    <Container>
      <GridContainer spacing={3}>
        <GridItem xs={6}>
          <img src={Phones} height="600px" width="900px" alt="phones" />
        </GridItem>
        <GridItem xs={6}>
          <Container className={classes.containerLeft}>
            <h1 id="landing-title">Welcome to ParkInn!</h1>

            <div class="fade-in">
              <p id="landing-subtitle">The parking management software that allows you to easily take care of your parking reservations.</p>
            </div>

            <div>
              {!isAuthenticated && ( <button className="landing-button" onClick={() => loginWithRedirect({
                  redirect_uri: `${config.address}/dash`
              })}>Log in ></button>)}

              {!isAuthenticated && ( <button className="landing-button" onClick={() => loginWithRedirect({
                  redirect_uri: `${config.address}/dash`
              })}>Sign up ></button>)}
              <br /><br /><br /><br />

            </div>

            {/* <div id="next">
              <div id="bottom">
                <img src={Arrow} height="80px" width="80px" fill="gray" alt="next" />
              </div>
            </div>           */}
            </Container>
            <div id="bottom">
              <a href="#features">
                <p id="landing-link">
                  <img src={Arrow} height="20px" width="20px" fill="gray" alt="next" /><span className="tab">Learn More</span>
                </p>
              </a>
            </div>
        </GridItem>
      </GridContainer>
    </Container>
  );
}

MainLandingLayout.propTypes = {
  backgroundClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLandingLayout);