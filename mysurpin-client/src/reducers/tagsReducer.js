import { SHOW_USER_TAGS } from "../actions/index";
import { initialState } from "./initialState";

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_USER_TAGS:
      return Object.assign({}, state, {
        showUserTags: "서버에서 받아온 값",
      });

    default:
      return state;
  }
};

export default tagsReducer;
