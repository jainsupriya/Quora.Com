import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Quora from "./Quora/Quora";
import Content from "./Quora/Content";
import MyProfile from "./Quora/profile/MyProfile";
import Profile from "./Quora/profile/Profile";
import Message from "./Quora/Message/Message";
import PrivateRoute from "./auth/PrivateRoute";

// Check for token
// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   authToken(localStorage.jwtToken);
//   // Decode token and get user info and exp
//   const decoded = jwt_decode(localStorage.jwtToken);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));

//   // Check for expired token
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     // Logout user
//     store.dispatch(logoutUser());

//     // Redirect to login
//     window.location.href = "/login";
//   }
// }

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Switch>
              <PrivateRoute exact path="/" component={Quora} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/content" component={Content} />
              <Route path="/myprofile" component={MyProfile} />
              <Route path="/profile/:id" component={Profile} />
              <Route path="/message" component={Message} />
              <PrivateRoute path="/home" component={Quora} />
              <Route render={() => <h3>Page not Found</h3>} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default Main;
