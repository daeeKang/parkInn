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
                  <p id="about-title">Available on Web and IOS platforms</p>
                </GridItem>

                <GridContainer>
                  <GridItem xs={6}>
                    <p id="about-subtitle">Web? Get started here.</p>
                  </GridItem>
                  <GridItem xs={6}>
                    <p id="about-subtitle">IOS? Find us on the App Store.</p>
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