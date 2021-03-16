import React from "react";
import { Switch, Route } from "react-router-dom";
import Game from "../pages/Game.js";
import Home from "../pages/Home.js";
import PageNotFound from "../pages/PageNotFound";

function PageContent() {
  return (
    <div className="flex-auto">
      <Switch>
        <Route exact path="/game" component={Game} />
        <Route exact path="/" component={Home} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default PageContent;
