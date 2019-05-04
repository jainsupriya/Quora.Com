import { GET_PROFILE, CLEAR_PROFILE } from "../actions/types";

const initialState = {
  profile: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };

    case CLEAR_PROFILE:
      return {};
    default:
      return state;
  }
}
