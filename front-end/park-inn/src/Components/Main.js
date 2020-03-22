import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./HomePage/Home";
import Statistics from "./StatisticsPage/Statistics";
import Management from "./ManagementPage/Management";

export default () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/statistics" component={Statistics} />
        <Route exact path="/management" component={Management} />
      </Switch>
    </main>
  );
};
