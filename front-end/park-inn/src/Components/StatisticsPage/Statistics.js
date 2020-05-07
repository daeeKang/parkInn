import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Statistics.css';
import '../ChartData/Charts.css';

import { NavLink } from 'react-router-dom';

import GridContainer from './../Grid/GridContainer';
import GridItem from './../Grid/GridItem';
import Card from './../Card/Card';
import CardHeader from './../Card/CardHeader';
import CardIcon from './../Card/CardIcon';
import CardBody from './../Card/CardBody';
import { Divider } from '@material-ui/core';
import api from '../../utils/api';

// charts
import ChartistGraph from 'react-chartist';
import {
  lotUtilizationChart,
  dailySalesChart,
  monthlySalesChart,
  peakHoursChart,
} from './../ChartData/Charts';

import { SetData } from '../../utils/statisticsApi';

// icons
import MoneyIcon from '../Icons/money_white.svg';
import UserIcon from '../Icons/users_white.svg';
import ClockIcon from '../Icons/clock_white.svg';
import ArrowIcon from '../Icons/arrow.svg';

import { useAuth0 } from '../../react-auth0-spa';

export default function Statistics() {
  const [
    totalRevenue,
    peakTimes,
    totalParked,
    averageTimeParked,
    monthlyRevenue,
  ] = SetData();
  return (
    <div>
      <Header></Header>
      <div className="dash-pad">
      <GridContainer>
        <div id="card-container">
          <GridItem xs={12} sm={12} md={4} lg={4}>
            <Card>
              <CardHeader color="blue" icon>
                <CardIcon color="blue">
                  <img src={ClockIcon} height="30px" width="30px" alt="money" />
                </CardIcon>
                <p id="icon-subtitle">Average Time Parked</p>
                <p id="icon-text">
                  <font color="#4ea3cc">
                    <b>{averageTimeParked}</b>
                  </font>{' '}
                  minute(s)
                </p>
                <Divider />
                hi
              </CardHeader>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4} lg={4}>
            <Card>
              <CardHeader color="red" icon>
                <CardIcon color="red">
                  <img src={UserIcon} height="30px" width="30px" alt="money" />
                </CardIcon>
                <p id="icon-subtitle">Customers Parked</p>
                <p id="icon-text">
                  <font color="#E57373">
                    <b>{totalParked}</b>
                  </font>{' '}
                  parked
                </p>
                <Divider />
                hi
                {/* <NavLink className="link" to="/lotUtil">
                  <p id="link">
                    <img
                      src={ArrowIcon}
                      height="12px"
                      width="12 px"
                      alt="press-link"
                    />{' '}
                    View Lot Utilization
                  </p>
                </NavLink> */}
              </CardHeader>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4} lg={4}>
            <Card>
              <CardHeader color="green" icon>
                <CardIcon color="green">
                  <img src={MoneyIcon} height="30px" width="30px" alt="money" />
                </CardIcon>
                <p id="icon-subtitle">Total Revenue</p>
                <p id="icon-text">
                  <font color="#63c454">
                    <b>${totalRevenue}</b>
                  </font> {' '}
                  earned
                </p>
                <Divider />
                hi
              </CardHeader>
            </Card>
          </GridItem>
        </div>

        {/* <div id="graph-container"> */}
          <GridItem xs={12} sm={12} md={6} lg={6}>
            <Card chart>
              <CardHeader color="blue">
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
                <br />
                <font color="#555" id="card-text">
                  Monthly Revenue Earned
                </font>
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
                <br />
                <font color="#555" id="card-text">
                  Peak Hours
                </font>
              </CardBody>
            </Card>
          </GridItem>
        {/* </div> */}
      </GridContainer>
      </div>
      <Footer />
    </div>
  );
}
