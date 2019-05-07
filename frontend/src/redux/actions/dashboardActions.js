import axios from "axios";
import {
    GET_ANSWER_VIEWS,
    GET_ANSWER_UPVOTES,
    GET_ANSWER_DOWNVOTES,
    GET_ERRORS
} from "./types";

export const getAnswersByViews  = userId => dispatch => {
  axios
    .get(`/answers/orderByViews/${userId}`)
    .then(res => {
        console.log(res);
        dispatch({
            type: GET_ANSWER_VIEWS,
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

export const getAnswersByUpvotes  = userId => dispatch => {
  axios
    .get(`/answers/orderByUpVotes/${userId}`)
    .then(res => {
        console.log(res);
        dispatch({
            type: GET_ANSWER_UPVOTES,
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

export const getAnswersByDownvotes  = userId => dispatch => {
  axios
    .get(`/answers/orderByDownVotes/${userId}`)
    .then(res => {
        console.log(res);
        dispatch({
            type: GET_ANSWER_DOWNVOTES,
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