import { SET_MESSAGE_HISTORY, SET_RECEIVER_DATA } from "../actions/types";

const initialState = {
  messagehistory: [],
  receiverData: {},
  isPolling: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_MESSAGE_HISTORY":
      return {
        ...state,
        messagehistory: action.payload
      };
    case "SET_RECEIVER_DATA":
      return {
        ...state,
        receiverData: action.payload
      };
    default:
      return state;
  }
}
