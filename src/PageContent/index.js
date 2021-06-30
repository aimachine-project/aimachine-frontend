import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Game from "../pages/Game";
import Home from "../pages/Home";
import Login from "../pages/Login";
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
        <Route exact path="/login" component={Login} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default PageContent;
