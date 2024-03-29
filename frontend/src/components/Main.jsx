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
import Dashboard from "./Quora/Dashboard";
import PrivateRoute from "./auth/PrivateRoute";
import Message from "./Quora/Message/Message";
import QuestionAnswer from "./Quora/AnswerComponent/QuestionAnswer";
import Answers from "./Quora/AnswerComponent/Answers";
import Search from "./Quora/homeComponents/Search";

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
              <PrivateRoute path="/content" component={Content} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/myprofile" component={MyProfile} />
              <PrivateRoute path="/profile/:id" component={Profile} />
              <PrivateRoute path="/message" component={Message} />
              <PrivateRoute path="/answer" component={QuestionAnswer} />
              <PrivateRoute path="/Search" component={Search} />   
              <PrivateRoute path="/deactivate" component={Login} />               
              <PrivateRoute path="/:id" component={Answers} />
              <Route render={() => <h3>Page not Found</h3>} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default Main;
