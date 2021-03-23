import { MODAL_OPEN, MODAL_CLOSE } from "../actions/index";
import { initialState } from "./initialState";

const alertModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return Object.assign({}, state, {
        alertModal: {
          open: action.open,
          text: action.text,
        },
      });

    case MODAL_CLOSE:
      return Object.assign({}, state, {
        alertModal: {
          open: action.open,
          text: action.text,
        },
      });

    default:
      return state;
  }
};

export default alertModalReducer;
