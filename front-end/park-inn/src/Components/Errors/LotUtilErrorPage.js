import React from 'react';
import './Errors.css';
import Footer from '../Footer/Footer';
import { NavLink } from 'react-router-dom';
import ArrowIcon from '../Icons/arrow.svg';

export default (props) => {
  return (
    <div>
      <div id="header" class="error-header font">
        <div class="error-icon">
          <div class="error-logo"></div>
        </div>
        Sorry, looks like you don't have any lots to view.
        <div class="error-message font">
          {' '}
          Please create lots here at
          <NavLink className="link" to="/renderer">
            <p id="link" class="font">
              <img
                src={ArrowIcon}
                height="12px"
                width="12 px"
                alt="press-link"
              />{' '}
              Manage Spaces
            </p>
          </NavLink>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};
