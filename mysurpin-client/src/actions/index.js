// action types
// user
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const USER_EDIT = "USER_EDIT";
// surpin
export const GET_NEW_LISTS = "GET_NEW_LISTS";
export const GET_BEST_TAGS = "GET_BEST_TAGS";
export const SHOW_USER_LISTS = "SHOW_USER_LISTS";
export const SHOW_SURPIN = "SHOW_SURPIN";
// tag
export const SHOW_USER_TAGS = "SHOW_USER_TAGS";

// actions creator functions
// user action

export const signIn = (token, email, nickname) => {
  return {
    type: SIGN_IN,
    payload: {
      token,
      email,
      nickname,
    },
  };
};

export const signOut = (token, email) => {
  return {
    type: SIGN_OUT,
    payload: {
      token,
      email,
    },
  };
};

export const userEdit = (token, email, password, nickname) => {
  return {
    type: USER_EDIT,
    payload: {
      token,
      email,
      password,
      nickname,
    },
  };
};

// surpin action
export const getNewLists = (pageNumber) => {
  return {
    type: GET_NEW_LISTS,
    payload: {
      pageNumber,
    },
  };
};

export const getBestTags = () => {
  return {
    type: GET_BEST_TAGS,
  };
};

export const showUserLists = (token, nickname, tag, pageNumber) => {
  return {
    type: SHOW_USER_LISTS,
    payload: {
      token,
      nickname,
      tag,
      pageNumber,
    },
  };
};

export const showSurpin = (token, listId, email) => {
  return {
    type: SHOW_SURPIN,
    payload: {
      token,
      listId,
      email,
    },
  };
};

// tags

export const showUserTags = (nickname) => {
  return {
    type: SHOW_USER_TAGS,
    payload: {
      nickname,
    },
  };
};
