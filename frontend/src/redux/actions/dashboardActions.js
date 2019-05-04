import axios from "axios";
import {
    GET_ANSWER_VIEWS,
    GET_ERRORS
} from "./types";

export const getAnswersByViews  = () => dispatch => {
  axios
    .get(`/answers/orderByViews`)
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