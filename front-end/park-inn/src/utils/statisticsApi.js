import api from './api';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { useAuth0 } from '../react-auth0-spa';

// function UserData() {
//   const { user } = useAuth0();
//   return user;
// }

export function SetData() {
  const { user } = useAuth0();
  const [totalRevenue, setTotalRevenue] = useState('0.00');
  const [peakTimes, setPeakTimes] = useState({
    labels: [],
    series: [],
  });
  const [totalParked, setTotalParked] = useState(0);
  const [averageTimeParked, setAverageTimeParked] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState({
    labels: [],
    series: [],
  });

  useEffect(() => {
    fetchTotalRevenue(user, setTotalRevenue);
    fetchPeakTimes(user, setPeakTimes);
    fetchPeopleParked(user, setTotalParked);
    fetchAverageTimeParked(user, setAverageTimeParked);
    fetchMonthlyRevenue(user, setMonthlyRevenue);
  }, [user, totalRevenue, totalParked, averageTimeParked]);
  return [
    totalRevenue,
    peakTimes,
    totalParked,
    averageTimeParked,
    monthlyRevenue,
  ];
}

export function SetHomeData() {
  const { user } = useAuth0();
  const [peakTimes, setPeakTimes] = useState({
    labels: [],
    series: [],
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  useEffect(() => {
    fetchPeakTimes(user, setPeakTimes);
    fetchMonthlyRevenue(user, setMonthlyRevenue);
  }, [user]);
  return [peakTimes, monthlyRevenue];
}

async function fetchTotalRevenue(user, setTotalRevenue) {
  try {
    const { data } = await api.get(`Statistic/${user.companyName}`);
    var rev = data.companyStatistics.revenue;
    rev = rev / 100;
    setTotalRevenue(rev.toFixed(2));
  } catch (err) {
    console.log(err);
  }
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

async function fetchPeopleParked(user, setTotalParked, index = 0) {
  try {
    const { data } = await api.get(`Statistic/${user.companyName}`);
    const amountParked =
      data.lotStatistics[index].totalSpots -
      data.lotStatistics[index].availableSpots;
    setTotalParked(amountParked);
  } catch (err) {
    console.log(err.message);
  }
}

async function fetchAverageTimeParked(user, setAverageTimeParked, index = 0) {
  try {
    const { data } = await api.get(`Statistic/${user.companyName}`);
    const avg = data.lotStatistics[index].averageTimeParked.currentAverage;
    setAverageTimeParked(avg);
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
