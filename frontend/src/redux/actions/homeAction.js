import axios from "axios";
import {
  GET_ERRORS,
  GET_QUESTIONS,
  GET_QUESTION,
  GET_USER_DETAILS
} from "./types";

export const getUserDetails = userId => dispatch => {
  axios
    .get(`/user/${userId}`)
    .then(res =>
      dispatch({
        type: GET_USER_DETAILS,
        payload: res.data[0]
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.data
      })
    );
};
export const getQuestions = topic => dispatch => {
  axios
    .get(`/questions/searchByTopic/${topic}`)
    .then(res =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.data
      })
    );
};
