import React from 'react';
import ErrorPage from '../Errors/LotUtilErrorPage';
import Footer from '../Footer/Footer';
import { NavLink } from 'react-router-dom';

export default (props) => {
  return (
    // if theres no current lots?
    <div>
      <ErrorPage />
    </div>
  );
};
