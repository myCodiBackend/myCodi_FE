import { combineReducers, configureStore } from "@reduxjs/toolkit";

import comments from "../modules/commentsSlice";
import comment from "../modules/commentSlice";
import posts from "../modules/postSlice";
import post from "../modules/postsSlice";

// import logger from "redux-logger";
// 리듀서 통합
const rootReducer = combineReducers({
  post,
  posts,
  comments,
  comment,
});

// 스토어 연결
const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
