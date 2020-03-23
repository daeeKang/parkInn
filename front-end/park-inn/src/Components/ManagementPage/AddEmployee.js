import React, { Component } from "react";
import "./AddEmployee.css";
import AddIcon from "../../Icons/AddIcon";

export class AddEmployee extends Component {
  render() {
    return (
      <div class="page add-page">
        <div class="header">Add Employee</div>
        <div class="add-container">
          <AddIcon></AddIcon>
        </div>
      </div>
    );
  }
}

export default AddEmployee;
