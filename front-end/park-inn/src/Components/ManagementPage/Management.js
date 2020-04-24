import React, { Component } from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "./Management.css";
import { AddEmployee } from "./AddEmployee";

class Management extends Component {
  render() {
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
}

export default Management;
