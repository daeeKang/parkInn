import React from 'react';
import './Errors.css';
import Footer from '../Footer/Footer';
import { NavLink } from 'react-router-dom';

export default (props) => {
  return (
    <div>
      <div id="header" class="error-header"></div>
      <Footer></Footer>
    </div>
  );
};
