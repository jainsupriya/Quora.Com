import axios from "axios";
import {
  GET_ERRORS,
  GET_QUESTIONS,
  GET_QUESTION,
  GET_ANSWERS_FOR_QUESTIONS,
  GET_USER_DETAILS_QUESTIONS,
  GET_USER_DETAILS
} from "./types";

export const getUserDetails = userId => dispatch => {
  var topic;
  axios
    .get(`/user/${userId}`)
    .then(res => {
      var data = res.data[0];

      if (
        data.interestedTopicList !== undefined &&
        data.interestedTopicList.length
      ) {
        topic = data.interestedTopicList[0];
      } else {
        topic = "topic1";
      }
      axios
        .get(`/questions/searchTopic/${topic}`)
        .then(res =>
          dispatch({
            type: GET_USER_DETAILS_QUESTIONS,
            payload: {
              userDetails: data,
              questions: res.data
            }
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err !== undefined && err.data !== undefined ? err.data : {}
          })
        );
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err !== undefined && err.data !== undefined ? err.data : {}
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
        payload: err !== undefined && err.data !== undefined ? err.data : {}
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
        payload: err !== undefined && err.data !== undefined ? err.data : {}
      })
    );
};

export const addQuestion = questionData => dispatch => {
  axios
    .post("/question", questionData)
    .then(res => {
      if (res.status === 200) {
        axios
          .get(`/user/${questionData.questionOwner}`)
          .then(res => {
            var data = res.data[0];

            if (
              data.interestedTopicList !== undefined &&
              data.interestedTopicList.length
            ) {
              var topic =
                data.interestedTopicList[data.interestedTopicList.length - 1];
              axios
                .get(`/questions/searchTopic/${topic}`)
                .then(res =>
                  dispatch({
                    type: GET_USER_DETAILS_QUESTIONS,
                    payload: {
                      userDetails: data,
                      questions: res.data
                    }
                  })
                )
                .catch(err =>
                  dispatch({
                    type: GET_ERRORS,
                    payload:
                      err !== undefined && err.data !== undefined
                        ? err.data
                        : {}
                  })
                );
            } else {
              axios
                .get("/questions")
                .then(res =>
                  dispatch({
                    type: GET_USER_DETAILS_QUESTIONS,
                    payload: {
                      userDetails: data,
                      questions: res.data
                    }
                  })
                )
                .catch(err =>
                  dispatch({
                    type: GET_ERRORS,
                    payload:
                      err !== undefined && err.data !== undefined
                        ? err.data
                        : {}
                  })
                );
            }
          })
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload:
                err !== undefined && err.data !== undefined ? err.data : {}
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
        payload: err !== undefined && err.data !== undefined ? err.data : {}
      })
    );
};

export const getAnswersForQuestion = questionId => dispatch => {
  console.log(questionId);
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
        payload: err !== undefined && err.data !== undefined ? err.data : {}
      })
    );
};

export const getUserDetailsOnly = userId => dispatch => {
  console.log("ruchika here");
  axios
    .get(`/user/${userId}`)
    .then(res => {
      var data = res.data[0];
      dispatch({
        type: GET_USER_DETAILS,
        payload: data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err !== undefined && err.data !== undefined ? err.data : {}
      })
    );
};
