import React from 'react';
import './Loading.css';
import icon from './assets/puff.svg';

export default () => (
    <div className="spinner" class="loading-container">
      <img src={icon} alt="Loading" class="loading" />
    </div>
  );