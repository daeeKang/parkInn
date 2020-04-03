import React from "react";
import "./Home.css";
import "../ChartData/Charts.css";
import { NavLink } from "react-router-dom";
// import Login from '../LoginPage/Login' //just place holder for now maybe lol

import GridContainer from "./../Grid/GridContainer";
import GridItem from "./../Grid/GridItem";
import Card from "./../Card/Card";
import CardHeader from "./../Card/CardHeader";
import CardIcon from "./../Card/CardIcon";
import CardBody from "./../Card/CardBody";
import { Divider } from "@material-ui/core";

// icons used
import MoneyIcon from "../Icons/money_white.svg";
import IncidentIcon from "../Icons/incident_white.svg";
import EventIcon from "../Icons/event_white.svg";
import ParkingIcon from "../Icons/parking_white.svg";
import ArrowIcon from "../Icons/arrow.svg";

import ChartistGraph from "react-chartist";
import {
    dailySalesChart,
    monthlySalesChart,
    peakHoursChart
} from "./../ChartData/Charts";

export default props => {
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="green" icon>
                            <CardIcon color="green">
                                <img
                                    src={MoneyIcon}
                                    height="30px"
                                    width="30px"
                                    alt="money"
                                />
                            </CardIcon>
                            <p id="icon-subtitle">Today's Revenue</p>
                            <p id="icon-text">
                                <font color="#81C784">
                                    <b>$1,000</b>
                                </font>{" "}
                                earned
                            </p>
                            <Divider />
                            <NavLink className="link" to="/statistics">
                                <p id="link">
                                    <img
                                        src={ArrowIcon}
                                        height="12px"
                                        width="12 px"
                                        alt="press-link"
                                    />{" "}
                                    See Daily Revenue
                                </p>
                            </NavLink>
                        </CardHeader>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="red" icon>
                            <CardIcon color="red">
                                <img
                                    src={IncidentIcon}
                                    height="30px"
                                    width="30px"
                                    alt="incident"
                                />
                            </CardIcon>
                            <p id="icon-subtitle">Incidents</p>
                            <p id="icon-text">
                                <font color="#E57373">
                                    <b>2 incident(s)</b>
                                </font>{" "}
                                to be resolved
                            </p>
                            <Divider />
                            <NavLink className="link" to="/incidents">
                                <p id="link">
                                    <img
                                        src={ArrowIcon}
                                        height="12px"
                                        width="12 px"
                                        alt="press-link"
                                    />{" "}
                                    Resolve Incidents
                                </p>
                            </NavLink>
                        </CardHeader>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="yellow" icon>
                            <CardIcon color="yellow">
                                <img
                                    src={EventIcon}
                                    height="30px"
                                    width="30px"
                                    alt="event"
                                />
                            </CardIcon>
                            <p id="icon-subtitle">Upcoming Events</p>
                            <p id="icon-text">
                                <font color="#FFB74D">
                                    <b>1 events(s)</b>
                                </font>{" "}
                                upcoming
                            </p>
                            <Divider />
                            <NavLink className="link" to="/events">
                                <p id="link">
                                    <img
                                        src={ArrowIcon}
                                        height="12px"
                                        width="12 px"
                                        alt="press-link"
                                    />{" "}
                                    See Event Calendar
                                </p>
                            </NavLink>
                        </CardHeader>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="teal" icon>
                            <CardIcon color="teal">
                                <img
                                    src={ParkingIcon}
                                    height="30px"
                                    width="30px"
                                    alt="parking"
                                />
                            </CardIcon>
                            <p id="icon-subtitle">Manage Spaces</p>
                            <p id="icon-text">
                                <font color="#14BACE">
                                    <b>1 lot(s)</b>
                                </font>{" "}
                                to view
                            </p>
                            <Divider />
                            <NavLink className="link" to="/parking">
                                <p id="link">
                                    <img
                                        src={ArrowIcon}
                                        height="12px"
                                        width="12 px"
                                        alt="press-link"
                                    />{" "}
                                    Manage Parking Lots
                                </p>
                            </NavLink>
                        </CardHeader>
                    </Card>
                </GridItem>

                {/* testing graph card */}
                <GridItem xs={12} sm={12} md={6}>
                    <Card chart>
                        <CardHeader color="darkBlue">
                            <ChartistGraph
                                className="ct-chart-line"
                                data={monthlySalesChart.data}
                                type={"Line"}
                                options={monthlySalesChart.options}
                                listener={monthlySalesChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <Divider />
                            <NavLink className="link" to="/statistics">
                                <p id="link">
                                    <br></br>
                                    <img
                                        src={ArrowIcon}
                                        height="12px"
                                        width="12 px"
                                        alt="press-link"
                                    />{" "}
                                    View Monthly Sales
                                </p>
                            </NavLink>
                        </CardBody>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                    <Card chart>
                        <CardHeader color="lightBlue">
                            <ChartistGraph
                                className="ct-chart-bar"
                                data={peakHoursChart.data}
                                type={"Bar"}
                                options={peakHoursChart.options}
                                listener={peakHoursChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <Divider />
                            <NavLink className="link" to="/statistics">
                                <p id="link">
                                    <br></br>
                                    <img
                                        src={ArrowIcon}
                                        height="12px"
                                        width="12 px"
                                        alt="press-link"
                                    />{" "}
                                    View Peak Hours
                                </p>
                            </NavLink>
                        </CardBody>
                    </Card>
                </GridItem>

                {/* <GridItem xs={12} sm={12} md={4}>
                    <Card style={{ width: "20rem" }}>
                        <CardBody>
                            <CardHeader color="yellow">
                                <h1 id="card-header">Card Type 1</h1>
                            </CardHeader>
                            <h2 id="card-title">Card Title</h2>
                            <Divider />
                            <p id ="card-subtitle">
                                This is the first card type. <br />
                                I hope that this looks right!
                            </p>
                        </CardBody>
                    </Card>
                </GridItem> */}

                {/* <GridItem xs={12} sm={12} md={4}>
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
                </GridItem> */}
            </GridContainer>

            {/* <Login/> */}
        </div>
    );
};
