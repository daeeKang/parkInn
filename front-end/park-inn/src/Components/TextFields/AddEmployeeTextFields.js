import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "../../Icons/AddIcon";
import { useAuth0 } from "../../react-auth0-spa";
import Loading from '../LoadingPage/Loading';
import 'react-notifications/lib/notifications.css';
import { NotificationManager} from 'react-notifications';
import api from '../../utils/api';

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));

export default function BasicTextFields() {
  const { loading, user } = useAuth0();
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const classes = useStyles();

  if (loading) {
    return <Loading />;
  }

  function addEmployee(e) {
    if(validateFields()){
      setAddButtonClicked(true);
      api.post('Staff/AddStaff', {
        username: email,
        first: firstName,
        last: lastName,
        companyid: user.companyid,
        companyName: user.companyName, 
        admin: false,
      })
      .then(function (response) {
        console.log(response);
        clearInputFields();
        NotificationManager.success(`Employee ${firstName} ${lastName} has been added`, 'Add Employee');
      })
      .catch(function (error) {
        console.log(error);
        NotificationManager.error('Email Already Exists!', 'Add Employee');
      });
    }
    e.preventDefault();
  }

  function clearInputFields(){
    setFirstName('');
    setLastName('');
    setEmail('');
  }

  function validateFields(){
    const nameValidation = /^[A-Za-z]+$/;
    const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(firstName === '' || !nameValidation.test(firstName)){
      NotificationManager.error('Please Enter a Valid First Name', 'Add Employee');
      return false;
    }
    else if(lastName === '' || !nameValidation.test(lastName)){
      NotificationManager.error('Please Enter a Valid Last Name', 'Add Employee');
      return false;
    }
    else if(!emailValidation.test(email.toLowerCase())){
      NotificationManager.error('Please Enter a Valid Email', 'Add Employee');
      return false;
    }
    return true;
  }

  function handleChange(e) {
    const value = e.target.value;
    switch(e.target.name){
      case 'first': setFirstName(value); break;
      case 'last': setLastName(value); break;
      case 'email': setEmail(value); break;
      default: break;
    }
  }

  return (
    <div id="input-fields" class="input-fields">
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      style={{ width: `100%` }}
    >
      <TextField
        style={{ width: `25%` }}
        id="standard-basic"
        label="First Name"
        name="first"
        onChange={handleChange}
        value={firstName}
      />
      <TextField
        style={{ width: `25%` }}
        id="standard-basic"
        label="Last Name"
        name="last"
        onChange={handleChange}
        value={lastName}

      />
      <TextField 
        style={{ width: `25%` }} 
        id="standard-basic" 
        label="Email" name="email" 
        onChange={handleChange}
        value={email}
 />
    </form>   
      <button class="add-button" onClick={addEmployee}>
      <AddIcon></AddIcon>
      </button>
    </div>
  );
}
