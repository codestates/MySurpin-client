import {
  GET_NEW_LISTS,
  GET_BEST_TAGS,
  SHOW_USER_LISTS,
  SHOW_SURPIN,
  GET_TAG_LISTS,
} from "../actions/index";
import { initialState } from "./initialState";

const surpinReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEW_LISTS:
      return Object.assign({}, state, {
        newLists: action.payload.data,
      });

    case GET_BEST_TAGS:
      return Object.assign({}, state, {
        tags: action.payload.data,
      });

    case SHOW_USER_LISTS:
      return Object.assign({}, state, {
        showUserLists: "서버에서 받아온 값",
      });

    case SHOW_SURPIN:
      return Object.assign({}, state, {
        showSurpin: action.payload.data,
      });

    case GET_TAG_LISTS:
      return Object.assign({}, state, {
        searchTagLists: action.payload.data,
      });
    default:
      return state;
  }
};

export default surpinReducer;
