import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Home.css';
import '../ChartData/Charts.css';
import { NavLink } from 'react-router-dom';
// import Login from '../LoginPage/Login' //just place holder for now maybe lol
import GridContainer from './../Grid/GridContainer';
import GridItem from './../Grid/GridItem';
import Card from './../Card/Card';
import CardHeader from './../Card/CardHeader';
import CardIcon from './../Card/CardIcon';
import CardBody from './../Card/CardBody';
import { Divider } from '@material-ui/core';

// icons used
import MoneyIcon from '../Icons/money_white.svg';
import IncidentIcon from '../Icons/incident_white.svg';
import StatisticsIcon from '../Icons/statistics.svg';
import ParkingIcon from '../Icons/parking_white.svg';
import ArrowIcon from '../Icons/arrow.svg';

import ChartistGraph from 'react-chartist';
import {
  dailySalesChart,
  monthlySalesChart,
  peakHoursChart,
} from './../ChartData/Charts';

import { SetData } from '../../utils/homeApi';

export default function Home() {
  const [peakTimes, monthlyRevenue, amountOfLots] = SetData();
  return (
    <div>
      <Header />
      <div className="dash-pad">
      <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CardHeader color="lightBlue" icon>
                <CardIcon color="lightBlue">
                  <img
                    src={StatisticsIcon}
                    height="30px"
                    width="30px"
                    alt="event"
                  />
                </CardIcon>
                <h3 id="icon-subtitle">Welcome to ParkInn!</h3>
                <p id="icon-text">
                  View your <font color="#83bedb"><b>earnings</b></font>,
                  <font color="#83bedb"> <b>customers parked</b></font>, and <font color="#83bedb"><b>more</b></font>.
                </p>
                <Divider />
                <NavLink className="link" to="/statistics">
                  <p id="link">
                    <img
                      src={ArrowIcon}
                      height="11px"
                      width="11px"
                      alt="press-link"
                    />{' '}
                    See Statistics
                  </p>
                </NavLink>
              </CardHeader>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CardHeader color="darkBlue" icon>
                <CardIcon color="darkBlue">
                  <img
                    src={ParkingIcon}
                    height="30px"
                    width="30px"
                    alt="parking"
                  />
                </CardIcon>
                <h3 id="icon-subtitle">Manage Spaces</h3>
                <p id="icon-text">
                  <font color="#273941">
                    <b>{amountOfLots} lot(s)</b>
                  </font>{' '}
                  to view
                </p>
                <Divider />
                <NavLink className="link" to="/renderer">
                  <p id="link">
                    <img
                      src={ArrowIcon}
                      height="12px"
                      width="12 px"
                      alt="press-link"
                    />{' '}
                    Manage Parking Lots
                  </p>
                </NavLink>
              </CardHeader>
            </Card>
          </GridItem>

          {/* testing graph card */}
          <GridItem xs={12} sm={12} md={6} lg={6}>
            <Card chart>
              <CardHeader color="lightBlue">
                <ChartistGraph
                  className="ct-chart-line"
                  data={monthlyRevenue}
                  type={'Line'}
                  options={monthlySalesChart.options}
                  listener={monthlySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <Divider />
                <NavLink className="link" to="/statistics">
                  <p id="link">
                    <br></br>
                    <img
                      src={ArrowIcon}
                      height="12px"
                      width="12 px"
                      alt="press-link"
                    />{' '}
                    View Monthly Sales
                  </p>
                </NavLink>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={6} lg={6}>
            <Card chart>
              <CardHeader color="darkBlue">
                <ChartistGraph
                  className="ct-chart-bar"
                  data={peakTimes}
                  type={'Bar'}
                  options={peakHoursChart.options}
                  listener={peakHoursChart.animation}
                />
              </CardHeader>
              <CardBody>
                <Divider />
                <NavLink className="link" to="/statistics">
                  <p id="link">
                    <br></br>
                    <img
                      src={ArrowIcon}
                      height="12px"
                      width="12 px"
                      alt="press-link"
                    />{' '}
                    View Peak Hours
                  </p>
                </NavLink>
              </CardBody>
            </Card>
          </GridItem>

          {/* <GridItem xs={12} sm={12} md={4}>
                      <Card style={{ width: "20rem" }}>
                          <CardBody>
                              <CardHeader color="yellow">
                                  <h1 id="card-header">Card Type 1</h1>
                              </CardHeader>
                              <h2 id="card-title">Card Title</h2>
                              <Divider />
                              <p id ="card-subtitle">
                                  This is the first card type. <br />
                                  I hope that this looks right!
                              </p>
                          </CardBody>
                      </Card>
                  </GridItem> */}

          {/* <GridItem xs={12} sm={12} md={4}>
                      <Card style={{ width: "20rem" }}>
                          <img
                          // className={classes.cardImgTop}
                          // data-src="holder.js/100px180/"
                          alt="100%x180"
                          style={{ height: "180px", width: "100%", display: "block" }}
                          src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22320%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_163df23d717%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_163df23d717%22%3E%3Crect%20width%3D%22320%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22119.0859375%22%20y%3D%2297.35%22%3E320x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                          data-holder-rendered="true"
                          />
                          <CardBody>
                              <Divider />
                              <p>
                                  This is the third card type.
                              </p>
                          </CardBody>
                      </Card>
                  </GridItem> */}
      </GridContainer>
      </div>

      {/* <Login/> */}
      <Footer />
    </div>
  );
}
