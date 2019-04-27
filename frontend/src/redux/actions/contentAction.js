import axios from "axios";
import {
    GET_CONTENTS,
    GET_ERRORS
} from "./types";

export const getContentDetails = userId => dispatch => {
  axios
    .get(`/content/byUserId/${userId}`)
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
