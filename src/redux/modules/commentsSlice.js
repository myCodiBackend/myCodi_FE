import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import instance from "../../shared/Request";

const accessToken = localStorage.getItem("Authorization")
  ? localStorage.getItem("Authorization")
  : null;
const refreshToken = localStorage.getItem("RefreshToken");

let config = {
  headers: {
    Authorization: accessToken,
    RefreshToken: refreshToken,
  },
};
console.log(accessToken);

// //댓글리스트 조회
// export const __getCommnetsByPostId = createAsyncThunk(
//   "GET_COMMENT_BY_TODO_ID",
//   async (arg, thunkAPI) => {
//     try {
//       const { data } = await axios.get(`http://localhost:5001/comments?postId=${arg}`);
//       return thunkAPI.fulfillWithValue(data);
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.code);
//     }
//   }
// );

//댓글리스트 조회 백엔드쪽
export const __getCommnetsByPostId = createAsyncThunk(
  "GET_COMMENT_BY_TODO_ID",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://13.125.217.64/api/comments/${arg}`
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// //댓글 추가
// export const __addComment = createAsyncThunk(
//   "ADD_COMMENT",
//   async (arg, thunkAPI) => {
//     try {
//       const { data } = await axios.post(`http://localhost:5001/comments`, arg);
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// //댓글 추가 백엔드쪽
export const __addComment = createAsyncThunk(
  "ADD_COMMENT",

  //댓글리스트 조회 백엔드쪽

  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `http://13.125.217.64/api/comments`,
        arg,
        config
      );
      console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// //댓글 삭제
// export const __deleteComment = createAsyncThunk(
//   "DELETE_COMMENT",
//   async (arg, thunkAPI) => {
//     try {
//       await axios.delete(`http://localhost:5001/comments/${arg}`);
//       return thunkAPI.fulfillWithValue(arg);
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.code);
//     }
//   }
// );

//댓글 삭제 백엔드쪽
export const __deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      await axios.delete(`http://13.125.217.64/api/comments/${arg}`, config);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// //댓글 수정
// export const __updateComment = createAsyncThunk(
//   "UPDATE_COMMENT",
//   async (arg, thunkAPI) => {
//     try {
//       axios.patch(`http://localhost:5001/comments/${arg.id}`, arg);
//       return thunkAPI.fulfillWithValue(arg);
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );

//댓글 수정 백엔드쪽
export const __updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      const res = await axios.put(
        `http://13.125.217.64/api/comments/${arg.id}`,
        arg,
        config
      );
      console.log(res.data.data);
      return thunkAPI.fulfillWithValue(res.data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  commentsByPostId: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    // 댓글 조회 (todoId)
    [__getCommnetsByPostId.pending]: (state) => {
      state.commentsByPostId.isLoading = true;
    },
    [__getCommnetsByPostId.fulfilled]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.data = action.payload;
    },
    [__getCommnetsByPostId.rejected]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.error = action.payload;
    },

    // 댓글 삭제
    [__deleteComment.pending]: (state) => {
      state.commentsByPostId.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      const target = state.commentsByPostId.data.findIndex(
        (comment) => comment.id === action.payload
      );
      state.commentsByPostId.data.splice(target, 1);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.error = action.payload;
    },

    // 댓글 수정
    [__updateComment.pending]: (state) => {},
    [__updateComment.fulfilled]: (state, action) => {
      const target = state.commentsByPostId.data.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.commentsByPostId.data.splice(target, 1, action.payload);
    },
    [__updateComment.rejected]: () => {},
    // 댓글 추가
    [__addComment.fulfilled]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.data.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.error = action.payload;
    },
    [__addComment.pending]: (state) => {
      state.commentsByPostId.isLoading = true;
    },
  },
});

export default commentsSlice.reducer;
