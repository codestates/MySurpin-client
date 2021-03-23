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
  showSurpin: {}, // urls 배열 [{name, url}]
  showUserLists: {},
  showUserTags: {},
  // MainPage & NavBar SearchTagsLists
  searchTagLists: {},
  mainPage: {},
  alertModal: {
    open: false,
    text: "",
  },
};
