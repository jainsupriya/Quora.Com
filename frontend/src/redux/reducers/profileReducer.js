import {
  GET_PROFILE,
  CLEAR_PROFILE,
  GET_FOLLOWER,
  GET_FOLLOWING,
  GET_USER_ANSWER,
  GET_FOLLOWED_QUESTION,
  GET_ASKED_QUESTION
} from "../actions/types";

const initialState = {
  profile: {},
  follower: [],
  following: [],
  askedQuestion:[],
  followedQuestion:[],
  userAnswer:[],

};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case GET_FOLLOWER:
    console.log(action.payload)
      return {
        ...state,
        follower: action.payload
      };
    case GET_FOLLOWING:
      return {
        ...state,
        following: action.payload
      };
      case GET_ASKED_QUESTION:
      return {
        ...state,
        askedQuestion: action.payload
      };
      case GET_FOLLOWED_QUESTION:
      return {
        ...state,
        followedQuestion: action.payload
      };
      case GET_USER_ANSWER:
      return {
        ...state,
        userAnswer: action.payload
      };

    case CLEAR_PROFILE:
      return {};
    default:
      return state;
  }
}
