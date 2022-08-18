import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../shared/Request";
const accesstoken = localStorage.getItem('Authorization')
  const refreshtoken = localStorage.getItem('RefreshToken')



  // let config = {
  //   headers: {
  //       "access-token": userToken
  //   }
  // }


// // 게시글 현재 내용
// export const __getPost = createAsyncThunk(
//   "GET_POST",
//   async (arg, thunkAPI) => {
//     try {
//       const { data } = await axios.get(`http://localhost:5001/posts/${arg}`);
//       return thunkAPI.fulfillWithValue(data);
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );

// 게시글 현재 내용 백엔드쪽
export const __getPost = createAsyncThunk(
  "GET_POST",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://13.125.217.64/api/posts/${arg}`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);


//게시글 수정 백엔드쪽
export const __updatePost = createAsyncThunk(
  "UPDATE_POST",
  async (data, thunkAPI) => {
    try {
    const res = await axios.put(
      `http://13.125.217.64/api/posts/${data.id}`,
    data.updateform,
    {
      headers: {
        "Content-Type": "multipart/form-data",
          Authorization: accesstoken,
          RefreshToken: refreshtoken
      }
    });
    console.log(res.data.data)
    return thunkAPI.fulfillWithValue(res.data.data);
  } catch (e) {
    console.log("캐치입니다")
    return thunkAPI.rejectWithValue(e);
  }
}
);





const initialState = {
  data: {
    content: "",
    username: "",
    id: 0,

  },
  isLoading: false,
  error: null,
};

export const PostSlice = createSlice({
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
     // 게시글 수정(U)
    [__updatePost.pending]: (state, action) => {
      state.loading = true;
    },
    [__updatePost.fulfilled]: (state, action) => {
      const target = state.data.findIndex(
        (post) => {
          return post.id == action.payload.id
        }
      );
      console.log(target)
      state.data.splice(target, 1, action.payload);
       
    },
    [__updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearPost } = PostSlice.actions;
export default PostSlice.reducer;