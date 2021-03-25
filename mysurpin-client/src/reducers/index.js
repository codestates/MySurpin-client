import { combineReducers } from "redux";
import userReducer from "./userReducer";
import surpinReducer from "./surpinReducer";
import tagsReducer from "./tagsReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["userReducer", "surpinReducer", "tagsReducer"],
};

const rootReducer = combineReducers({
  userReducer,
  surpinReducer,
  tagsReducer,
});

export default persistReducer(persistConfig, rootReducer);
