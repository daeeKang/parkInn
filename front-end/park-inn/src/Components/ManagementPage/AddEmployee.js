import React, { Component } from "react";
import "./AddEmployee.css";
import AddIcon from "../../Icons/AddIcon";
import Card from "../Card/Card";
import AddEmployeeTextFields from "../TextFields/AddEmployeeTextFields";

export class AddEmployee extends Component {
  constructor(props) {
    super(props);

    this.initState();
    this.initHandlers();
  }

  initState() {
    this.addButtonClicked = false;
  }

  initHandlers() {
    this.handers = {
      addEmployee: () => {
        this.addButtonClicked = true;
        console.log("this.addButtonClicked :", this.addButtonClicked);
      },
    };
  }

  renderTextField() {
    return (
      <div id="input-fields" class="input-fields">
        <AddEmployeeTextFields></AddEmployeeTextFields>
        <button class="add-button" onClick={() => this.handers.addEmployee()}>
          <AddIcon></AddIcon>
        </button>
      </div>
    );
  }

  render() {
    return (
      <Card style={{ height: `100%` }}>
        <div class="sub-header">Add Employee</div>
        <div id="add-page" class="add-page">
          <form>
            {this.renderTextField()}
            {this.renderTextField()}
            {this.renderTextField()}
          </form>
        </div>
      </Card>
    );
  }
}

function addTextField() {
  console.log("helksjfr");
  return (
    <div id="input-fields" class="input-fields">
      <AddEmployeeTextFields></AddEmployeeTextFields>
      <button class="add-button" onClick={() => addTextField()}>
        <AddIcon></AddIcon>
      </button>
    </div>
  );
}
export default AddEmployee;
