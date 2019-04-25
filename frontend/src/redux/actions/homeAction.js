import axios from "axios";
import { GET_ERRORS, GET_QUESTIONS, GET_QUESTION } from "./types";

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
