import React, { Component } from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "./Management.css";
import { AddEmployee } from "./AddEmployee";
import axios from 'axios';
import config from '../../auth_config.json';
import { useAuth0 } from '../../react-auth0-spa';
import Loading from '../LoadingPage/Loading';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Management = () => {
    const { loading, user } = useAuth0();
    
    if (loading) {
      return <Loading />;
    }

    function handlePasswordChange(e){
      axios.post(`https://${config.domain}/dbconnections/change_password`, {
        client_id: config.clientId,
        email: user.username,
        connection: config.connection,
      })
      .then(function (response) {
        console.log(response);
        NotificationManager.success('An Email Has Been Sent to you', 'Password Change');
      })
      .catch(function (error) {
        console.log(error);
        NotificationManager.error('There was an Error in changing your password', 'Password Change');
      });
    }


    return (
      <div>
        <Header />
        <div class="page">
          <div class="page-header">Account Management</div>
          <div class="management-container">
            <button class="button change-password">Change Password</button>
            <div class="add-employee-container">
              <AddEmployee></AddEmployee>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    // will try this method l8r
    // <GridContainer>
    // <GridItem xs={12} sm={12} md={12}>
    // <div class="page-header">Account Management</div>
    //   <div class="management-container">
    //     <button class="button change-password">Change Password</button>
    //     <div class="add-employee-container">
    //       <AddEmployee></AddEmployee>
    //     </div>
    //   </div>
    // </GridItem>
    // </GridContainer>
    );
}

export default Management;
