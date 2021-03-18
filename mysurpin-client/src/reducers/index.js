import { combineReducers } from "redux";
import userReducer from "./userReducer";
import surpinReducer from "./surpinReducer";
import tagsReducer from "./tagsReducer";
import practiceReducer from "./practiceReducer";

const rootReducer = combineReducers({
  userReducer,
  surpinReducer,
  tagsReducer,
  practiceReducer,
});

export default rootReducer;
