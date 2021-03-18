import { INCREMENT } from "../actions/index";
import { initialState } from "./initialState";

const practiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      console.log(action.type);
      return state + 1;

    default:
      return state;
  }
};

export default practiceReducer;
