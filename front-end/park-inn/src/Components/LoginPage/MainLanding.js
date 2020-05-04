import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button} from '@material-ui/core';
import MainLandingLayout from './MainLandingLayout';

const backgroundImage = '../Icons/test.png';

const styles = (theme) => ({
  background: {
    backgroundColor: '#7fc7d9',
    backgroundPosition: 'center',
  },

  button: {
    minWidth: 200,
  },

  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },

  more: {
    marginTop: theme.spacing(2),
  },
});

function MainLanding(props) {
  const { classes } = props;

  return (
    <MainLandingLayout backgroundClassName={classes.background}>
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
    </MainLandingLayout>
  );
}

MainLanding.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLanding);