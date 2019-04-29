import axios from "axios";
import authToken from "./authToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_PROFILE } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/user", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      authToken(token);
      // Decode token to get user data
      // const decoded = jwt_decode(token);
      // console.log("Decoded::" + JSON.stringify(decoded));
      // Set current user
      dispatch(setCurrentUser(res.data.MongoData[0]));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  authToken(false);

  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch(clearCurrentProfile());
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_PROFILE
  };
};
