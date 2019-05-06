import {
  GET_PROFILE,
  CLEAR_PROFILE,
  GET_FOLLOWER,
  GET_FOLLOWING
} from "../actions/types";

const initialState = {
  profile: {},
  follower: [],
  following: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case GET_FOLLOWER:
      return {
        ...state,
        follower: action.payload
      };
    case GET_FOLLOWING:
      return {
        ...state,
        following: action.payload
      };

    case CLEAR_PROFILE:
      return {};
    default:
      return state;
  }
}
