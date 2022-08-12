import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import commentsSlice from "../modules/commentsSlice";
// import postSlice from "../modules/postSlice";
//로거 각자
import logger from "redux-logger";
// 리듀서 통합
const rootReducer = combineReducers({
  // postSlice,
  // commentsSlice,
});

// 스토어 연결
const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
