import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Game from "../pages/Game.js";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import "./style.scss";

function PageContent() {
  return (
    <div className="page-content">
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
