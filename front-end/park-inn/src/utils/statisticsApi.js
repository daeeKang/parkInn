import api from './api';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const companyName = 'MGM'; // temp

export const getTotalRevenue = async () => {
  try {
    const { data } = await api.get(`Statistic/${companyName}`);
    var rev = data.companyStatistics.revenue;
    rev = rev / 100;
    return rev.toFixed(2);
  } catch (err) {
    console.log(err.message);
  }
};

export const getPeakTimesCount = async index => {
  try {
    const { data } = await api.get(`Statistic/${companyName}`);
    return data.companyStatistics.peakTimes[index].count;
  } catch (err) {
    console.log(err.message);
  }
};

export const getLotStatistics = async index => {
  try {
    const { data } = await api.get(`Statistic/${companyName}`);
    return data.lotStatistics;
  } catch (err) {
    console.log(err.message);
  }
};
