import axios from "axios";
import {
  GET_ERRORS,
  GET_QUESTIONS,
  GET_QUESTION,
  GET_USER_DETAILS,
  GET_ANSWERS_FOR_QUESTIONS,
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
export const getTopicQuestions = topic => dispatch => {
  axios
    .get(`/questions/searchTopic/${topic}`)
    .then(res =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data
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
    .get("/questions")
    .then(res =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.data
      })
    );
};

export const addQuestion = questionData => dispatch => {
  axios
    .post("/question", questionData)
    .then(res => {
      if (res.status === 200) {
        axios
          .get("/questions")
          .then(res =>
            dispatch({
              type: GET_QUESTIONS,
              payload: res.data
            })
          )
          .then(res =>
            axios.get(`/user/${questionData.questionOwner}`).then(res =>
              dispatch({
                type: GET_USER_DETAILS,
                payload: res.data[0]
              })
            )
          )
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.data
            })
          );
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data
        });
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.data
      })
    );
};

export const getAnswersForQuestion = questionId => dispatch => {
  axios
    .get(`/question/${questionId}`)
    .then(res =>
      dispatch({
        type: GET_ANSWERS_FOR_QUESTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.data
      })
    );
  
};