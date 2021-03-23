import { combineReducers } from "redux";
import userReducer from "./userReducer";
import surpinReducer from "./surpinReducer";
import tagsReducer from "./tagsReducer";
import alertModalReducer from "./alertModalReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["userReducer", "surpinReducer", "tagsReducer"], // 수정
};

const rootReducer = combineReducers({
  userReducer,
  surpinReducer,
  tagsReducer,
  alertModalReducer,
});

// export default rootReducer;
export default persistReducer(persistConfig, rootReducer);
