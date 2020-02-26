import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './HomePage/Home';
import Statistics from './StatisticsPage/Statistics';

export default () => {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/statistics' component={Statistics}/>   
            </Switch>
        </main>
    )
}