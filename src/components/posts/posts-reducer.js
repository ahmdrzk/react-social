export const initialState = {
  posts: [],
  perPage: 10,
  nextSkip: 0,
  isLastPage: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        nextSkip:
          action.payload.posts.length && !(action.payload.posts.length < state.perPage)
            ? state.nextSkip + state.perPage
            : state.nextSkip,
        isLastPage: action.payload.posts.length < state.perPage,
      };

    case "SET_ONE_POST":
      return {
        ...state,
        posts: [action.payload.post],
      };

    case "SET_NEW_POST":
      return {
        ...state,
        posts: [action.payload.post, ...state.posts],
        nextSkip: state.nextSkip + 1,
      };

    case "SET_UPDATED_POST":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (action.payload.postId === post.id) return action.payload.updatedPost;
          return post;
        }),
      };

    case "DELETE_POST":
      return { ...state, posts: state.posts.filter((post) => post.id !== action.payload.postId) };

    case "SET_POST_LIKES":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (action.payload.postId === post.id) post.likesCount = action.payload.likesCount;
          return post;
        }),
      };

    case "RESET":
      return initialState;

    default:
      break;
  }
};
