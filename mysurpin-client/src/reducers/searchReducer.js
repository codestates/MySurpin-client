import { SEARCH_TAG_LISTS } from "../actions/index";
import { initialState } from "./initialState";

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TAG_LISTS:
      return Object.assign({}, state, {
        searchTagLists: action.payload.data,
      });

    default:
      return state;
  }
};

export default searchReducer;
