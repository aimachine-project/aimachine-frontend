import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Game from "../pages/Game.js";
import Home from "../pages/Home.js";

function PageContent() {
  return (
    <BrowserRouter>
      <div className="flex-auto">
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default PageContent;
