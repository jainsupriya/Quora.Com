import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import errorReducer from "./errorReducer";
import contentReducer from "./contentReducer";
import messageReducer from "./messageReducer";
import dashboardReducer from "./dashboardReducer";


export default combineReducers({
  homeState: homeReducer,
  auth: authReducer,
  profile: profileReducer,
  errors: errorReducer,
  contents: contentReducer,
  dashboard: dashboardReducer,
  message: messageReducer
});
