export const initialState = {
  comments: [],
  perPage: 10,
  nextSkip: 0,
  isLastPage: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return {
        ...state,
        comments: [...state.comments, ...action.payload.comments],
        nextSkip:
          action.payload.comments.length && !(action.payload.comments.length < state.perPage)
            ? state.nextSkip + state.perPage
            : state.nextSkip,
        isLastPage: action.payload.comments.length < state.perPage,
      };

    case "SET_ONE_COMMENT":
      return {
        ...state,
        comments: [action.payload.comment],
      };

    case "SET_NEW_COMMENT":
      return {
        ...state,
        comments: [action.payload.comment, ...state.comments],
        nextSkip: state.nextSkip + 1,
      };

    case "SET_UPDATED_COMMENT":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (action.payload.commentId === comment.id) return action.payload.updatedComment;
          return comment;
        }),
      };

    case "DELETE_COMMENT":
      return { ...state, comments: state.comments.filter((comment) => comment.id !== action.payload.commentId) };

    case "SET_COMMENT_LIKES":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (action.payload.commentId === comment.id) comment.likesCount = action.payload.likesCount;
          return comment;
        }),
      };

    case "RESET":
      return initialState;

    default:
      break;
  }
};
