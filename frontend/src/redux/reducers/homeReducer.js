import { GET_QUESTIONS, GET_QUESTION } from "../actions/types";
const initialState = {
  questions: [],
  question: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
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
