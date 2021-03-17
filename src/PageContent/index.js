import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Game from "../pages/Game.js";
import Home from "../pages/Home.js";
import PageNotFound from "../pages/PageNotFound";

function PageContent() {
  return (
    <div className="flex-auto">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game">
          <Redirect to="/" />
        </Route>
        <Route path="/game/:gameName" component={Game} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default PageContent;
