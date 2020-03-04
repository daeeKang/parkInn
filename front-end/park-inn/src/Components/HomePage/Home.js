import React from 'react';
import './Home.css'
import { Grid, Divider } from '@material-ui/core';
// import Login from '../LoginPage/Login' //just place holder for now maybe lol
import GridItem from './../Grid/GridItem';
import Card from './../Card/Card';
import CardBody from './../Card/CardBody';
import CardHeader from './../Card/CardHeader';
import CardIcon from './../Card/CardIcon';
import AssessmentIcon from '@material-ui/icons/Assessment';

const lightBlue = "#b3e5fc";

export default props => {
    return (
        <div>
            {/* <Grid container> */}
                <GridItem xs={12} sm={12}>
                    <Card style={{ width: "20rem" }}>
                        <CardBody>
                            {/* change cardHeader color inside CardHeader.js && cardHeaderStyle.js */}
                            <CardHeader color="main">
                                {/* change id = card-header inside Home.css */}
                                <h1 id="card-header">Card Type 1</h1>
                            </CardHeader>
                            {/* change id = card-title inside Home.css */}
                            <h2 id="card-title">Card Title</h2>
                            <Divider />
                            {/* change id = card-subtitle inside Home.css */}
                            <p id ="card-subtitle">
                                This is the first card type. <br />
                                I hope that this looks right!
                            </p>
                        </CardBody>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12}>
                    <Card style={{ width: "20rem" }}>
                        <CardBody>
                            <CardHeader>
                                <CardIcon color="main">
                                    <AssessmentIcon />
                                </CardIcon>
                            </CardHeader>
                            <h2 id="card-title">Card Title</h2>
                            <Divider />
                            <p id ="card-subtitle">
                                This is the second card type. <br />
                                I hope that this looks right!
                            </p>
                        </CardBody>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12}>
                    <Card style={{ width: "20rem" }}>
                        <img
                        // className={classes.cardImgTop}
                        // data-src="holder.js/100px180/"
                        alt="100%x180"
                        style={{ height: "180px", width: "100%", display: "block" }}
                        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22320%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_163df23d717%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_163df23d717%22%3E%3Crect%20width%3D%22320%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22119.0859375%22%20y%3D%2297.35%22%3E320x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                        data-holder-rendered="true"
                        />
                        <CardBody>
                            <Divider />
                            <p>
                                This is the third card type.
                            </p>
                        </CardBody>
                    </Card>
                </GridItem>
            {/* </Grid> */}

            {/* <Login/> */}
        </div>
    )
}