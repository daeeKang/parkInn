import React, { Component } from "react";
import "./Management.css";

class Management extends Component {
  render() {
    return (
      <div class="page">
        <div class="header">Account Management</div>
        <div class="container">
          <button class="button change-password">Change Password</button>
        </div>
      </div>
    );
  }
}

export default Management;
