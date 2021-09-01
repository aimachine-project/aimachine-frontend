import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Game from "../pages/Game";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Account from "../pages/Account";
import PageNotFound from "../pages/PageNotFound";
import "./style.scss";

function PageContent(props) {
  return (
    <div className="page-content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game">
          <Redirect to="/" />
        </Route>
        <Route path="/games/:gameName" component={Game} />
        <Route
          exact
          path="/login"
          component={() => (
            <Login
              setLoggedUsername={(username) =>
                props.setLoggedUsername(username)
              }
            />
          )}
        />
        <Route exact path="/account" component={Account} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default PageContent;
