import {
  GET_QUESTIONS,
  GET_QUESTION,
  GET_USER_DETAILS,
  CLEAR_HOMESTATE,
  SET_USER_DETAILS,
  GET_ANSWERS_FOR_QUESTIONS,
  GET_USER_DETAILS_QUESTIONS,
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

    case GET_USER_DETAILS_QUESTIONS:
      return {
        ...state,
        isChanged: !state.isChanged,
        userDetails: action.payload.userDetails,
        questions: action.payload.questions
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
    case GET_ANSWERS_FOR_QUESTIONS:
      return {
        ...state,
        answerforquestions: action.payload
      };

    case CLEAR_HOMESTATE:
      return {};
    default:
      return state;
  }
}
