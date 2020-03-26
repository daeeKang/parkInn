import React from "react";
import AddEmployee from "../../Components/ManagementPage/AddEmployee";

export default props => {
  return (
    <div class="page">
      <div class="page-header">Account Management</div>
      <div class="management-container">
        <button class="button change-password">Change Password</button>
        <div class="add-employee-container">
          <AddEmployee></AddEmployee>
        </div>
      </div>
    </div>
  );
};
