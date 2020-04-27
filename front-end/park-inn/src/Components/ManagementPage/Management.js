import React from "react";
import "./Management.css";
import { AddEmployee } from "./AddEmployee";
import axios from 'axios';
import config from '../../auth_config.json';
import { useAuth0 } from '../../react-auth0-spa';
import Loading from '../LoadingPage/Loading';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '../Card/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const Management = () => {
    const classes = useStyles();
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
        <center>
          <p id="management-title" style={{fontSize: "30px", color: "#366387"}}>Manage Account Settings</p>
        </center>
        <br/>

        <NotificationContainer />

        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <Typography className={classes.heading}><p id="settings">General Settings</p></Typography>
            <Typography className={classes.secondaryHeading}><p id="settings-sub">Change your password</p></Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              {/* <Card style={{ height: `100%`, width:`100%` }}> */}
                {/* <div class="sub-header"> */}
                  <button class="button change-password"  onClick={handlePasswordChange}>Change Password</button>
                {/* </div> */}
              {/* </Card> */}
            </ExpansionPanelDetails>
          </ExpansionPanel>
      
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}><p id="settings">Employee Settings</p></Typography>
              <Typography className={classes.secondaryHeading}><p id="settings-sub">Add employees to manage parking</p></Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              <AddEmployee></AddEmployee>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <br/><br/><br/>
       </div>

      {/* <div class="page">
        <NotificationContainer />
        <div class="page-header">Account Management</div>
        <div class="management-container">
          <button class="button change-password"  onClick={handlePasswordChange}>Change Password</button>
          <div class="add-employee-container">
            <AddEmployee></AddEmployee>
          </div>
        </div>
      </div> */}
    </div>
    );
}

export default Management;
