import {
  SET_MESSAGE_HISTORY,
  SET_RECEIVER_DATA,
  GET_FOLLOWING_LIST
} from "../actions/types";

const initialState = {
  messagehistory: [],
  receiverData: {},
  isPolling: false,
  followingList: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_MESSAGE_HISTORY":
    console.log(action.payload)
      return {
        ...state,
        messagehistory: action.payload
      };
    case "SET_RECEIVER_DATA":
      return {
        ...state,
        receiverData: action.payload
      };

    case GET_FOLLOWING_LIST:
      console.log(action.payload);
      return {
        ...state,
        followingList: action.payload
      };
    default:
      return state;
  }
}
