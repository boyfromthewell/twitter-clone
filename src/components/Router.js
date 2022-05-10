import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "../routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
const AppRouter = ({ isLogin }) => {
  return (
    <Router>
      {isLogin && <Navigation />}
      <Switch>
        {isLogin ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <Route>
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;