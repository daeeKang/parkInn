import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./HomePage/Home";
import Statistics from "./StatisticsPage/Statistics";
import Events from "./EventsPage/Events";
import Incidents from "./IncidentsPage/Incidents";
import Management from "./ManagementPage/Management";

export default () => {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Home}/>
                {/* need to edit this route for the add/manage lot page */}
                <Route exact path='/parking' component={Home}/>
                <Route exact path='/statistics' component={Statistics}/>   
                <Route exact path='/events' component={Events}/> 
                <Route exact path='/incidents' component={Incidents}/> 
                <Route exact path='/management' component={Management}/> 
            </Switch>
        </main>
    )
}
