import { combineReducers } from "redux";
import userReducer from "./userReducer";
import surpinReducer from "./surpinReducer";
import tagsReducer from "./tagsReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  userReducer,
  surpinReducer,
  tagsReducer,
  searchReducer,
});

export default rootReducer;
