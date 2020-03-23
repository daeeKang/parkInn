import React, { Component } from "react";
import "./AddEmployee.css";
import AddIcon from "../../Icons/AddIcon";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";

export class AddEmployee extends Component {
  render() {
    return (
      <Card style={{ height: `100%` }}>
        <div class="sub-header">Add Employee</div>
        <div class="add-page"></div>
      </Card>
    );
  }
}

export default AddEmployee;
