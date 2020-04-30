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
  const [totalRevenue, peakTimes, totalParked, averageTimeParked] = SetData();

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="lightTeal" icon>
              <CardIcon color="lightTeal">
                <img src={ClockIcon} height="30px" width="30px" alt="money" />
              </CardIcon>
              <p id="icon-subtitle">Average Time Parked</p>
              <p id="icon-text">
                <font color="#74c9d4">
                  <b>{averageTimeParked} minute(s)</b>
                </font>
              </p>
              <Divider />
              hi
            </CardHeader>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="red" icon>
              <CardIcon color="red">
                <img src={UserIcon} height="30px" width="30px" alt="money" />
              </CardIcon>
              <p id="icon-text">
                <font color="#E57373">
                  <b>{totalParked}</b>
                </font>{' '}
                parked
              </p>
              <Divider />
              <NavLink className="link" to="/parking">
                <p id="link">
                  <img
                    src={ArrowIcon}
                    height="12px"
                    width="12 px"
                    alt="press-link"
                  />{' '}
                  View Lot Utilization
                </p>
              </NavLink>
            </CardHeader>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="green" icon>
              <CardIcon color="green">
                <img src={MoneyIcon} height="30px" width="30px" alt="money" />
              </CardIcon>
              <p id="icon-text">
                <font color="#81C784">
                  <b>$1,000</b>
                </font>{' '}
                earned today
              </p>
              <Divider />
              <NavLink className="link" to="/parking">
                <p id="link">
                  <img
                    src={ArrowIcon}
                    height="12px"
                    width="12 px"
                    alt="press-link"
                  />{' '}
                  View Sold Spots
                </p>
              </NavLink>
            </CardHeader>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card style={{ height: '9rem' }}>
            <CardBody>
              <CardHeader color="darkBlue">
                <h2 id="card-title">
                  <center>Total Revenue</center>
                </h2>
              </CardHeader>
              <br />
              <Divider />
              <h2 id="card-text">
                <center>{totalRevenue}</center>
              </h2>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="lightBlue">
              <ChartistGraph
                className="ct-chart-line"
                data={dailySalesChart.data}
                type={'Line'}
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <Divider />
              <br />
              <font color="#90CAF9" id="card-text">
                This Week's Sales Trend
              </font>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="blue">
              <ChartistGraph
                className="ct-chart-line"
                data={monthlySalesChart.data}
                type={'Line'}
                options={monthlySalesChart.options}
                listener={monthlySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <Divider />
              <br />
              <font color="#4ea3cc" id="card-text">
                Monthly Revenue Earned
              </font>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <Card>
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
              <font color="#1B262C" id="card-text">
                Peak Hours
              </font>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
