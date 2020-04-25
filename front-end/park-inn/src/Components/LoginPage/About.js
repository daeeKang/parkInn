import React from 'react';
import { Container, Grid } from '@material-ui/core';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';

export default props => {
  return(
    <a name="about">
      <div className="about-us">
          <br/>
          <Container>
            <GridContainer spacing={5}>
              <br/>
              <div className="about-text-section">
                <GridItem xs={12}>
                  <p id="about-title">ParkInn is the one-stop shop</p>
                  <p id="about-subtitle">for your parking management needs.</p>
                </GridItem>

                <GridContainer>
                  <GridItem xs={12} md={4}>
                    <p id="about-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </GridItem>
                  <GridItem xs={12} md={4}>
                    <p id="about-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </GridItem>
                  <GridItem xs={12} md={4}>
                    <p id="about-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </GridItem>
                </GridContainer>
              </div>
              <br/>
            </GridContainer>
          </Container>
          <br/>
      </div>
    </a>
  );
}