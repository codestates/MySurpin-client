import { combineReducers } from "redux";
import surpinReducer from "./surpinReducer";
import tagsReducer from "./tagsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  surpinReducer,
  tagsReducer,
  userReducer,
});

export default rootReducer;
