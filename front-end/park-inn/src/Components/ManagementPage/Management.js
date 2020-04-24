import React, { Component } from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "./Management.css";
import { AddEmployee } from "./AddEmployee";

class Management extends Component {
  render() {
    return (
      <div class="page">
        <Header />
        <div class="page-header">Account Management</div>
        <div class="management-container">
          <button class="button change-password">Change Password</button>
          <div class="add-employee-container">
            <AddEmployee></AddEmployee>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Management;
