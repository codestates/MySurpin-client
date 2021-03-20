import { combineReducers } from "redux";
import userReducer from "./userReducer";
import surpinReducer from "./surpinReducer";
import tagsReducer from "./tagsReducer";

const rootReducer = combineReducers({
  userReducer,
  surpinReducer,
  tagsReducer,
});

export default rootReducer;
