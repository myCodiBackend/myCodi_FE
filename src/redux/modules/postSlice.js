import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../shared/Request";


const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;


  let config = {
    headers: {
        "access-token": userToken
    }
  }


// 게시글 현재 내용
export const __getPost = createAsyncThunk(
  "GET_POST",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://localhost:5001/posts/${arg}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// // 게시글 현재 내용 백엔드쪽
// export const __getPost = createAsyncThunk(
//   "GET_POST",
//   async (arg, thunkAPI) => {
//     try {
//       const { data } = await instance.get(`/api/posts/${arg}`);
//       return thunkAPI.fulfillWithValue(data);
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );






const initialState = {
  data: {
    content: "",
    username: "",
    id: 0,

  },
  isLoading: false,
  error: null,
};

export const PostsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPost: (state) => {
      state.data.title = "";
      state.data.content = "";
      state.data.imgUrl = "";
    },
  },
  extraReducers: {
    [__getPost.pending]: (state) => {
      state.data.isLoading = true;
    },
    [__getPost.fulfilled]: (state, action) => {
      state.data.isLoading = false;
      state.data = action.payload;
    },
    [__getPost.rejected]: (state, action) => {
      state.data.isLoading = false;
      state.data.error = action.payload;
    },
  },
});

export const { clearPost } = PostsSlice.actions;
export default PostsSlice.reducer;