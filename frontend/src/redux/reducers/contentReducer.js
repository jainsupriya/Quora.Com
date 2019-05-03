import { GET_CONTENTS } from "../actions/types";
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

    default:
      return state;
  }
}
