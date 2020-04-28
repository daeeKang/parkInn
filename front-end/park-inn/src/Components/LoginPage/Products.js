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
          <br/><br/>
          <Container>
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <p id="about-title" style={{fontSize: "45px", color: "#366387"}}>Get started with ParkInn today!</p>
              <p id="features-text" style={{fontSize: "27px"}}><font color="#777">Available through your web browser or mobile (iOS only) phone.</font></p>
            </GridItem>
            <GridContainer spacing={5}>
              {/* <div className="about-text-section"> */}
                  <GridItem xs={12} sm={12} md={4} lg={4}>
                    <p id="about-heading" style={{fontSize: "25px"}}><font color="#adc9e0">Web</font></p>
                    <div className="about-img">
                      <img src={Laptop} height="50px" width="50px" />
                    </div>
                    <p id="features-text">Sign up<br/> <font color="#adc9e0">here</font></p>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4} lg={4}>
                    <p id="about-heading" style={{fontSize: "25px"}}><font color="#adc9e0">Mobile</font></p>
                    <div className="about-img">
                      <img src={Phone} height="50px" width="50px" />
                    </div>
                    <p id="features-text">Find us on the<br/> <font color="#adc9e0">App Store</font></p>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4} lg={4}>
                    <p id="about-heading" style={{fontSize: "25px"}}><font color="#adc9e0">Demo</font></p>
                    <div className="about-img">
                      <img src={Email} height="50px" width="50px" />
                    </div>
                    <p id="features-text">Email us at<br/><font color="#adc9e0">parkinn@gmail.com</font></p>
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
