import { GET_ANSWER_VIEWS } from "../actions/types";
const initialState = {
  answersByViews: []
};

export default function(state = initialState, action) {
    console.log(action.payload)
  switch (action.type) {
    case GET_ANSWER_VIEWS:
      return {
        ...state,
        answersByViews : action.payload
      };

    default:
      return state;
  }
}
