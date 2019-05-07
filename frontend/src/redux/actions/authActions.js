import axios from "axios";
import authToken from "./authToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_PROFILE,
  CLEAR_HOMESTATE,
  CLEAR_CONTENTS,
  CLEAR_ERRORS
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/user", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { msg: "Email or Username already exists" }
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
  dispatch(clearHomeState());
  dispatch(clearErrors());
  dispatch(clearContents());
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_PROFILE
  };
};

// Clear Home state
export const clearHomeState = () => {
  return {
    type: CLEAR_HOMESTATE
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Clear Contents
export const clearContents = () => {
  return {
    type: CLEAR_CONTENTS
  };
};
