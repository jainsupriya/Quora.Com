import { GET_CONTENTS, CLEAR_CONTENTS } from "../actions/types";
const initialState = {
  contents: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTENTS:
      return {
        ...state,
        contents: action.payload
      };
    case CLEAR_CONTENTS:
      return {};
    default:
      return state;
  }
}
