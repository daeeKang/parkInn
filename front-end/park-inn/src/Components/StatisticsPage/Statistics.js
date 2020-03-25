import React from "react";
import './Statistics.css'
import '../ChartData/Charts.css';

import GridContainer from './../Grid/GridContainer';
import GridItem from './../Grid/GridItem';
import Card from './../Card/Card';
import CardHeader from './../Card/CardHeader';
import CardIcon from './../Card/CardIcon';
import CardBody from './../Card/CardBody';
import { Divider } from '@material-ui/core';

import ChartistGraph from "react-chartist";
import { dailySalesChart, monthlySalesChart, peakHoursChart } from "./../ChartData/Charts";

export default props => {
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="darkBlue">
                            <ChartistGraph
                                className="ct-chart"
                                data={monthlySalesChart.data}
                                type={'Line'}
                                options={monthlySalesChart.options}
                                listener={monthlySalesChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <Divider />
                            Monthly Sales
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    )
}
