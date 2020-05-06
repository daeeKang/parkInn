import React from 'react';
import { Container, Grid } from '@material-ui/core';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';

import Arrow from './arrow_down.svg';
import Business from './service_black.svg';
import Money from './card_black.svg';
import Phone from './phone_black.svg';
import Features from './features_black.svg';


export default props => {
  return(
    <a name="about">
      {/* <div className="about-us"> */}
      <div className="about-us-2">
          <br/>
          <Container>
            <GridContainer spacing={5}>
              <br/>
              {/* <div className="about-text-section"> */}
                <GridItem xs={12} sm={12} md={12} lg={12}>
                  <p id="about-title">ParkInn is the one-stop shop<br/>for your parking management needs.</p>
                  {/* <p id="about-subtitle">
                    ParkInn is a multi-platform solution that allows you to
                    create virtual parking lots, sell parking reservations,<br/> and 
                    view real-time data about your parking lots and company earnings.
                  </p> */}
                </GridItem>
                <br/>
                <GridContainer>
                  <GridItem sm={12} xs={12} md={3} lg={3}>
                    <div className="about-img">
                      <img src={Business} height="30px" width="30px" />
                    </div>
                    <p id="about-heading">Our Service</p>
                    <p id="about-text">Our software is suitable for <font color="#adc9e0"><b>any business</b></font> — ranging anywhere from event centers, casinos, universities, festival parking, and more.</p>
                  </GridItem>
                  <GridItem sm={12} xs={12} md={3} lg={3}>
                    <div className="about-img">
                      <img src={Money} height="30px" width="30px" />
                    </div>
                    <p id="about-heading">Manage and Monetize</p>
                    <p id="about-text" style={{fontSize: "18px"}}>We created a <font color="#adc9e0"><b>parking lot designer</b></font> so that you can virtually layout your lots and 
                    customize the accessibility, availability, and price for each space in your lot.</p>
                  </GridItem>
                  <GridItem sm={12} xs={12} md={3} lg={3}>
                    <div className="about-img">
                      <img src={Phone} height="30px" width="30px" />
                    </div>
                    <p id="about-heading">Mobile Interface</p>
                    <p id="about-text" style={{fontSize: "18px"}}>Our <font color="#adc9e0"><b>multi-platform solution</b></font> provides a mobile interface for
                    parking enforcers to manage parking on-the-go, and for customers who want to reserve parking online.</p>
                  </GridItem>
                  <GridItem sm={12} xs={12} md={3} lg={3}>
                    <div className="about-img">
                      <img src={Features} height="30px" width="30px" />
                    </div>
                    <p id="about-heading">Core Features</p>
                    <p id="about-text">With ParkInn, you can now <font color="#adc9e0"><b>create</b></font> virtual parking lots, <font color="#adc9e0"><b>sell</b></font> parking reservations, and 
                    <font color="#adc9e0"><b> view</b></font> real-time analytics of your company earnings and parking lot visitors.</p>
                    <br/>
                    <div id="right">
                      <a href="#features">
                        <p id="landing-link">
                          <img src={Arrow} className="next" height="20px" width="20px" fill="gray" alt="next" /><span className="tab">See Our Features</span>
                        </p>
                      </a>
                    </div>
                  </GridItem>
                </GridContainer>
              {/* </div> */}
              <br/>
            </GridContainer>
          </Container>
          <br/>
      {/* </div> */}
      </div>
    </a>
  );
}