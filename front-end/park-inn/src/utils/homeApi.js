import api from './api';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { useAuth0 } from '../react-auth0-spa';

export function SetData() {
  const { user } = useAuth0();
  const [peakTimes, setPeakTimes] = useState({
    labels: [],
    series: [],
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState({
    labels: [],
    series: [],
  });
  const [amountOfLots, setAmountOfLots] = useState(0);

  useEffect(() => {
    fetchPeakTimes(user, setPeakTimes);
    fetchMonthlyRevenue(user, setMonthlyRevenue);
    fetchAmountOfLots(user, setAmountOfLots);
  }, [user]);
  return [peakTimes, monthlyRevenue, amountOfLots];
}

async function fetchPeakTimes(user, setPeakTimes) {
  let times = [12, 15, 18, 21, 0, 3, 6, 9];
  let peakTimes = {
    labels: ['12pm', '3pm', '6pm', '9pm', '12am', '3am', '6am', '9am'],
    series: [],
  };
  let seriesArr = [];
  try {
    const { data } = await api.get(`Statistic/${user.companyName}`);
    for (let i = 0; i < times.length; i++) {
      let currPeakTime = data.companyStatistics.peakTimes[times[i]];
      seriesArr.push(currPeakTime.count);
    }
    peakTimes.series.push(seriesArr);
    setPeakTimes(peakTimes);
  } catch (err) {
    console.log(err.message);
  }
}

async function fetchMonthlyRevenue(user, setMonthlyRevenue) {
  let monthlyRevenue = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    series: [],
  };
  let seriesArr = [];
  let totalRev = 0;
  try {
    for (let i = 1; i <= 12; i++) {
      let currMonthRev = 0;

      const { data } = await api.get(
        `Statistic/GetMonthRevenue/${user.companyName}/${i}`,
      );
      if (i == 1) {
        currMonthRev = data / 100;
        seriesArr.push(currMonthRev.toFixed(2));
      } else {
        currMonthRev = data - totalRev;
        currMonthRev = data / 100;
        seriesArr.push(currMonthRev.toFixed(2));
      }
      totalRev += data;
    }

    monthlyRevenue.series.push(seriesArr);
    setMonthlyRevenue(monthlyRevenue);
    return monthlyRevenue;
  } catch (err) {
    console.log(err.message);
  }
}

async function fetchAmountOfLots(user, setAmountOfLots) {
  try {
    const { data } = await api.get(`Lot/GetLots/${user.companyid}`);
    const amount = data.length;
    setAmountOfLots(amount);
  } catch (err) {
    console.log(err);
  }
}

function penniesToDollar(rev) {}
