import api from './api';

import React from 'react';
import ReactDOM from 'react-dom';

import { useAuth0 } from '../react-auth0-spa';

function UserData() {
  const { user } = useAuth0();
  // const companyName = user.companyName; // temp
  return user;
}

export const getTotalRevenue = async Component => {
  try {
    const user = UserData();
    const { data } = await api.get(`Statistic/${user.companyName}`);
    console.log('user :>> ', user);
    console.log('data :>> ', data);
    var rev = data.companyStatistics.revenue;
    rev = rev / 100;
    return props => {
      const totalRev = rev.toFixed(2);
      return <Component {...props} totalRevenue={totalRev} />;
    };
  } catch (err) {
    console.log(err);
  }
};

// export const getTotalRevenue = async () => {
//   try {
//     const user = UserData();
//     const { data } = await api.get(`Statistic/${user.companyName}`);
//     var rev = data.companyStatistics.revenue;
//     rev = rev / 100;
//     const totalRevenue = rev.toFixed(2);
//     return totalRevenue;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getTotalRevenue = async () => {
//   try {
//     const user = userData();
//     const { data } = await api.get(`Statistic/${user.companyName}`);
//     var rev = data.companyStatistics.revenue;
//     rev = rev / 100;
//     return rev.toFixed(2);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// export const getPeakTimesCount = async index => {
//   try {
//     const user = userData();
//     const { data } = await api.get(`Statistic/${user.companyName}`);
//     return data.companyStatistics.peakTimes[index].count;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// export const getLotStatistics = async index => {
//   try {
//     const user = userData();
//     const { data } = await api.get(`Statistic/${user.companyName}`);
//     return data.lotStatistics;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// export const getAverageTimeParked = async (index = 0) => {
//   try {
//     const user = userData();
//     const { data } = await api.get(`Statistic/${user.companyName}`);
//     return data.lotStatistics[index].averageTimeParked.currentAverage;
//   } catch (err) {
//     console.log(err.message);
//   }
// };
