import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import errorReducer from "./errorReducer";
import contentReducer from "./contentReducer";

export default combineReducers({
  homeState: homeReducer,
  auth: authReducer,
  profile: profileReducer,
  errors: errorReducer,
  contents: contentReducer
});
