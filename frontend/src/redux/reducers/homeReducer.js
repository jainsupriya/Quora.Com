import {  } from "../actions/types";
const initialState = {
    // addCodeList: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "SET_ADD_CODE_LIST":
            return {
                ...state,
                // addCodeList: action.payload
            };
        default:
            return state;
    }
}
