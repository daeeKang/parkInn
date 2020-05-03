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
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
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
    return peakTimes;
  } catch (err) {
    console.log(err.message);
  }
}

async function fetchMonthlyRevenue(user, setMonthlyRevenue) {
  try {
    const { data } = await api.get(
      `Statistic/GetMonthRevenue/${user.companyName}/12`,
    );
    console.log('data :>> ', data);
    setMonthlyRevenue('eep');
  } catch (err) {
    console.log(err);
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
