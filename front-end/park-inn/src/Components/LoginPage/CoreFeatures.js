import React from 'react';
import { Container, Grid } from '@material-ui/core';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import pls from './phone_transparent.png';

export default props => {
  return(
    <a name="features">
      {/* <div className="core-features"> */}
          <p> </p>
          <Container>
            <GridContainer spacing={5}>
              <GridItem xs={12} md={4}>
                <p id="features-title">Manage Parking</p>
                <img src={pls} height="300" width="400" alt="manage"/>
                <p id="features-text">Virtually create and manage parking lots</p>
              </GridItem>
              <GridItem xs={12} md={4}>
                <p id="features-title">Company Statistics</p>
                <img src={pls} height="300" width="400" alt="manage"/>
                <p id="features-text">View company and parking lot analytics</p>
              </GridItem>
              <GridItem xs={12} md={4}>
                <p id="features-title">Guest Reservations</p>
                <img src={pls} height="300" width="400" alt="manage"/>
                <p id="features-text">Allow guests to reserve parking in advanced</p>
              </GridItem>
            </GridContainer>
          </Container>
      {/* </div> */}
    </a>
  );
}