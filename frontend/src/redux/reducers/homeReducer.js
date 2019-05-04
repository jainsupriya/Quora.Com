import {
  GET_QUESTIONS,
  GET_QUESTION,
  GET_USER_DETAILS,
  CLEAR_HOMESTATE
} from "../actions/types";
const initialState = {
  questions: [],
  question: {},
  userDetails: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAILS:
      return {
        ...state,
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
    case CLEAR_HOMESTATE:
      return {};
    default:
      return state;
  }
}
