export const initialState = {
  user: {
    token: null,
    email: null,
    nickname: "guest",
  },
  // MainPage-NewLists
  newLists: {},
  // MainPage-BestTags
  tags: [],
  showSurpin: {},
  showUserLists: {},
  showUserTags: {},
  // MainPage & NavBar SearchTagsLists
  searchTagLists: {},
  mainPage: {},
  alertModal: {
    open: false,
    text: "",
  },
  googleToken: "",
};
