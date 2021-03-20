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
  showSurpin: {}, // urls 배열 [{urlName, url}]
  showUserLists: {},
  showUserTags: {},
  // MainPage & NavBar SearchTagsLists
  searchTagLists: {},
  mainPage: {},
};

export const fakeData = {
  surpinCount: 1,
  surpinCountPerPage: 10,
  surpins: [
    {
      surpinId: 1,
      title: "첫번째 서핀리스트",
      desc: "beDev",
      writer: "제원",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 1],
    },
    {
      surpinId: 2,
      title: "두번째 서핀리스트",
      desc: "beDev",
      writer: "윤택",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 2],
    },
    {
      surpinId: 3,
      title: "세번째 서핀리스트",
      desc: "beDev",
      writer: "주혜",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 3],
    },
    {
      surpinId: 4,
      title: "네번째 서핀리스트",
      desc: "beDev",
      writer: "유빈",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 4],
    },
    {
      surpinId: 5,
      title: "다섯번째 서핀리스트",
      desc: "beDev",
      writer: "제원",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 5],
    },
    {
      surpinId: 6,
      title: "여섯번째 서핀리스트",
      desc: "beDev",
      writer: "윤택",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 6],
    },
    {
      surpinId: 7,
      title: "일곱번째 서핀리스트",
      desc: "beDev",
      writer: "주혜",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 7],
    },
    {
      surpinId: 8,
      title: "여덟번째 서핀리스트",
      desc: "beDev",
      writer: "유빈",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 8],
    },
  ],
  top: [
    {
      surpinId: 6,
      title: "여섯번째 서핀리스트",
      desc: "beDev",
      writer: "윤택",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 6],
    },
    {
      surpinId: 1,
      title: "첫번째 서핀리스트",
      desc: "beDev",
      writer: "제원",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 1],
    },
    {
      surpinId: 2,
      title: "두번째 서핀리스트",
      desc: "beDev",
      writer: "윤택",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 2],
    },
    {
      surpinId: 3,
      title: "세번째 서핀리스트",
      desc: "beDev",
      writer: "주혜",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 3],
    },
    {
      surpinId: 8,
      title: "여덟번째 서핀리스트",
      desc: "beDev",
      writer: "유빈",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 8],
    },
    {
      surpinId: 4,
      title: "네번째 서핀리스트",
      desc: "beDev",
      writer: "유빈",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 4],
    },
    {
      surpinId: 5,
      title: "다섯번째 서핀리스트",
      desc: "beDev",
      writer: "제원",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 5],
    },
    {
      surpinId: 7,
      title: "일곱번째 서핀리스트",
      desc: "beDev",
      writer: "주혜",
      thumbnail:
        "https://ca.slack-edge.com/TR5603XSB-U01GVG58R5W-00ded8765867-512",
      created_At: "21-03-10 12:00:00",
      modified_At: "21-03-10 12:00:00",
      tags: ["다들", "힘내세요", 7],
    },
  ],
};
