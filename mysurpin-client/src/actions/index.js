// action types
// user
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const USER_EDIT = "USER_EDIT";
export const WITHDRAWAL = "WITHDRAWAL";
// surpin
export const GET_NEW_LISTS = "GET_NEW_LISTS";
export const GET_BEST_TAGS = "GET_BEST_TAGS";
export const SHOW_USER_LISTS = "SHOW_USER_LISTS";
export const SHOW_SURPIN = "SHOW_SURPIN";
export const GET_TAG_LISTS = "GET_TAG_LISTS";
// tag
export const SHOW_USER_TAGS = "SHOW_USER_TAGS";
// main
export const MAIN_PAGE_STATE = "MAIN_PAGE_STATE";

// actions creator functions

// fetch data
export const fetchData = (api, action) => (dispatch) => {
  return fetch(api)
    .then((res) => res.json())
    .then((data) => {
      dispatch(action(data));
    })
    .catch((err) => console.log(err));
};

// user action
export const signIn = (token, email, nickname) => {
  console.log(token, email, nickname);
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

export const withdrawal = (email, password) => {
  return {
    type: WITHDRAWAL,
    payload: {
      email,
      password,
    },
  };
};

// surpin action
export const getNewLists = (data) => {
  return {
    type: GET_NEW_LISTS,
    payload: {
      data,
    },
  };
};

export const getBestTags = (data) => {
  return {
    type: GET_BEST_TAGS,
    payload: {
      data,
    },
  };
};

export const showUserLists = (token, email, nickname, tag, pageNumber) => {
  return {
    type: SHOW_USER_LISTS,
    payload: {
      token,
      email,
      nickname,
      tag,
      pageNumber,
    },
  };
};

export const showSurpin = (data) => {
  return {
    type: SHOW_SURPIN,
    payload: {
      data,
    },
  };
};

export const getTagLists = (data) => {
  return {
    type: GET_TAG_LISTS,
    payload: {
      data,
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
