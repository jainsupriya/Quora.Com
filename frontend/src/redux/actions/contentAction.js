import axios from "axios";
import {
    GET_CONTENTS,
    GET_ERRORS
} from "./types";

export const getContentDetails = userId => dispatch => {
  axios
    .get(`/activity/byUserId/${userId}`)
    .then(res => {
        console.log(res);
        dispatch({
            type: GET_CONTENTS,
            payload: res.data
          })
        }      
    )
    .catch(err =>
        console.log(err)
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err.data
    //   })
    );
};

export const getOnlyAnswers = userId => dispatch => {
    axios
      .get(`/content/byUserId/${userId}/onlyAnswers`)
      .then(res => {
          console.log(res);
          dispatch({
              type: GET_CONTENTS,
              payload: res.data
            })
          }      
      )
      .catch(err =>
          console.log(err)
      //   dispatch({
      //     type: GET_ERRORS,
      //     payload: err.data
      //   })
      );
  };

  export const getOnlyQuestions = userId => dispatch => {
    axios
      .get(`/content/byUserId/${userId}/onlyQuestions`)
      .then(res => {
          console.log(res);
          dispatch({
              type: GET_CONTENTS,
              payload: res.data
            })
          }      
      )
      .catch(err =>
          console.log(err)
      //   dispatch({
      //     type: GET_ERRORS,
      //     payload: err.data
      //   })
      );
  };

  export const getOnlyFollowedQuestions = userId => dispatch => {
    axios
      .get(`/content/byUserId/${userId}/onlyFollowQuestions`)
      .then(res => {
          console.log(res);
          dispatch({
              type: GET_CONTENTS,
              payload: res.data
            })
          }      
      )
      .catch(err =>
          console.log(err)
      //   dispatch({
      //     type: GET_ERRORS,
      //     payload: err.data
      //   })
      );
  };