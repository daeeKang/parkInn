import React from "react";
import "./AddEmployee.css";
import AddIcon from "../../Icons/AddIcon";
import Card from "../Card/Card";
import AddEmployeeTextFields from "../TextFields/AddEmployeeTextFields";


export const AddEmployee = () => {

    return (
      <Card style={{ height: `100%` }}>
        <div class="sub-header">Add Employee</div>
        <div id="add-page" class="add-page">
          <form>
            <AddEmployeeTextFields />
            <AddEmployeeTextFields />
            <AddEmployeeTextFields />
          </form>
        </div>
      </Card>
    );

// function addTextField() {
//   console.log("helksjfr");
//   return (
//     <div id="input-fields" class="input-fields">
//       <AddEmployeeTextFields></AddEmployeeTextFields>
//       <button class="add-button" onClick={() => addTextField()}>
//         <AddIcon></AddIcon>
//       </button>
//     </div>
//   );
// }

}
