import { GET_ANSWER_VIEWS, GET_ANSWER_UPVOTES,GET_ANSWER_DOWNVOTES } from "../actions/types";
const initialState = {
  answersByViews: [],
  answersByUpvotes: [],
  answerByDownVotes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ANSWER_VIEWS:
      return {
        ...state,
        answersByViews: action.payload
      };
    case GET_ANSWER_UPVOTES:
      return {
        ...state,
        answersByUpvotes: action.payload
      };

    case GET_ANSWER_DOWNVOTES:
      return {
        ...state,
        answerByDownVotes: action.payload
      };
    default:
      return state;
  }
}
