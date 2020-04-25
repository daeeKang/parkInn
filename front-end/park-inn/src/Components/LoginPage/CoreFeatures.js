import React from 'react';
import { Container, Grid } from '@material-ui/core';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';

export default props => {
  return(
    <a name="features">
      <div className="core-features">
          <p> </p>
          <Container>
            <GridContainer spacing={5}>
              <GridItem xs={12} md={4}>
                <p id="core-features-text">Virtually create and manage parking lots</p>
              </GridItem>
              <GridItem xs={12} md={4}>
                <p id="core-features-text">View company and parking lot analytics</p>
              </GridItem>
              <GridItem xs={12} md={4}>
                <p id="core-features-text">Allow guests to reserve parking in advanced</p>
              </GridItem>
            </GridContainer>
          </Container>
      </div>
    </a>
  );
}