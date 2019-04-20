import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import FeedHome from "./layouts/FeedHome";
import Login from "./layouts/Login";
import SignUp from "./layouts/SignUp";
import jwt_decode from "jwt-decode";
import authToken from "../utils/authToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { Provider } from "react-redux";
import store from "../store";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  authToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/signin";
  }
}
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={FeedHome} />
              <Route exact path="/signin" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route render={() => <h3>Page not Found</h3>} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default Main;
