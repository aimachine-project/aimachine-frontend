import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Game from "../pages/Game";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import "./style.scss";

function PageContent() {
  return (
    <div className="page-content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/games">
          <Redirect to="/" />
        </Route>
        <Route path="/games/:gameName" component={Game} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default PageContent;
