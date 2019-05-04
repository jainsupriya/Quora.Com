import {
    SET_MESSAGE_HISTORY,
    SET_RECEIVER_DATA
} from "../actions/types";
import axios from "axios";
import { store } from "../store";
const BASE_URL = "http://52.9.137.32:5000/";


export const getChatHistory = (u1,u2) => dispatch => {
    console.log("pulled Data")
    // http://52.53.221.35:5000/message/5c96d8132375274f39176581/5c9a5359bcab2806f3552e1b
    axios
        .get("/messages/"+u1+"/"+u2)
        .then(res => {
            if (res.data.msg === "Success") {
                dispatch({
                    type: SET_MESSAGE_HISTORY,
                    payload: res.data
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
};


export const getReceiverData = (userId) => dispatch => {
    // console.log("called receiver data")
    axios
        .get("/user/"+userId)
        .then(res => {
            if (res.data.msg === "Success") {
                dispatch({
                    type: SET_RECEIVER_DATA,
                    payload: res.data.data
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
};


export const sendMessage = (u1,u2,content) => dispatch => {
    if (content.length > 0) {
        let sendData = {
            sender: u1,
            receiver: u2,
            content: content
        };
        axios
            .post(BASE_URL + "message", sendData)
            .then(res => {
                if (res.data.msg === "Success") {
                    dispatch(getChatHistory(u1,u2));
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};

