import {
  GET_QUESTIONS,
  GET_QUESTION,
  GET_USER_DETAILS,
  SET_USER_DETAILS
} from "../actions/types";

const initialState = {
  questions: [],
  question: {},
  userDetails: {},
  isChanged: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload
      };

    case SET_USER_DETAILS:
      return {
        ...state,
        isChanged: !state.isChanged,
        userDetails: action.payload
      };

    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };

    case GET_QUESTION:
      return {
        ...state,
        question: action.payload
      };
    default:
      return state;
  }
}
