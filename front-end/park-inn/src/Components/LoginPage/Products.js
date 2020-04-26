import React from 'react';
import { Container, Grid } from '@material-ui/core';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';

import Laptop from './laptop_black.svg';
import Phone from './phone_black.svg';
import Email from './email_black.svg';

export default props => {
  return(
    <a name="products">
      {/* <div className="about-us"> */}
          <br/>
          <Container>
            <GridItem xs={12}>
              <p id="about-title" style={{fontSize: "40px"}}>Try ParkInn today!</p>
              <p id="features-text" style={{fontSize: "27px"}}><font color="#999">Available through your web browser or mobile (iOS only) phone.</font></p>
            </GridItem>
            <GridContainer spacing={5}>
              {/* <div className="about-text-section"> */}
                  <GridItem xs={12} md={4}>
                    <p id="features-text" style={{fontSize: "30px"}}><font color="#999">Web</font></p>
                    <div className="about-img">
                      <img src={Laptop} height="50px" width="50px" />
                    </div>
                    <p id="features-text">Get started by<br/> <font color="#adc9e0"><b>signing up here</b></font></p>
                  </GridItem>

                  <GridItem xs={12} md={4}>
                    <p id="features-text" style={{fontSize: "30px"}}><font color="#999">Mobile</font></p>
                    <div className="about-img">
                      <img src={Phone} height="50px" width="50px" />
                    </div>
                    <p id="features-text">Find us on the<br/> <font color="#adc9e0"><b>App Store</b></font></p>
                  </GridItem>

                  <GridItem xs={12} md={4}>
                    <p id="features-text" style={{fontSize: "30px"}}><font color="#999">Demo</font></p>
                    <div className="about-img">
                      <img src={Email} height="50px" width="50px" />
                    </div>
                    <p id="features-text">Email us at<br/><font color="#adc9e0"><b>parkinn@gmail.com</b></font></p>
                  </GridItem>
              {/* </div> */}
              <br/>
            </GridContainer>
          </Container>
          <br/>
      {/* </div> */}
    </a>
  );
}
