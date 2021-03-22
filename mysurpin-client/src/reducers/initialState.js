export const initialState = {
  user: {
    token: null,
    email: "guest",
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
};
