import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import instance from "../../shared/Request";
const accesstoken = localStorage.getItem("Authorization");
const refreshtoken = localStorage.getItem("RefreshToken");

const URI = process.env.REACT_APP_BASE;

let config = {
  headers: {
    Authorization: accesstoken,
    RefreshToken: refreshtoken,
  },
};

// // 게시글 리스트
// export const __getPostList = createAsyncThunk("GET_POSTS", async () => {
//   const response = await axios.get(` http://localhost:5001/posts`);
//   // 전체 포스트 리스트
//   return response.data;
// });

// ----------------------------------------------게시글 등록

// 게시글 리스트 조회 백서버쪽
export const __getPostList = createAsyncThunk("GET_POSTS", async () => {
  const res = await axios.get(`${URI}/api/posts`);
  return res.data.data;
});

// //게시글 단건 조회 백엔드쪽
export const __getPost = createAsyncThunk("GET_POST", async (arg, thunkAPI) => {
  try {
    const { data } = await axios.get(`${URI}/api/posts/${arg}`);
    console.log(data);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

// //게시글 등록
// export const __addPost = createAsyncThunk("ADD_POST", async (new_post_list) => {
//   const response = await axios.post(
//     ` http://localhost:5001/posts`,
//     new_post_list
//   );

//   return response.data;
// });

// 게시글 등록 백엔드쪽
export const __addPost = createAsyncThunk("ADD_POST", async (form) => {
  const res = await axios.post(`${URI}/api/posts`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: accesstoken,
      RefreshToken: refreshtoken,
    },
  });
  return res.data;
});

// // 게시글 삭제
// export const __deletePost = createAsyncThunk("DELETE_POST", async (postId) => {
//   await axios.delete(` http://localhost:5001/posts/${postId}`);

//   // 포스트 아이디
//   return postId;
// });

// 게시글 삭제 백엔드쪽
export const __deletePost = createAsyncThunk("DELETE_POST", async (postId) => {
  const res = await axios.delete(`${URI}/api/posts/${postId}`, config);
  console.log(res);
  return postId;
});

// //게시글 수정
// export const __updatePost = createAsyncThunk(
//   "UPDATE_POST",
//   async ({ id, title, content }) => {
//     await axios.put(` http://localhost:5001/posts/${id}`,
//      {
//       id: id,
//       title: title,
//       content: content,
//     },
//     config);

//     return { id, title, content };
//   }
// );

//게시글 수정 백엔드쪽
export const __updatePost = createAsyncThunk(
  "UPDATE_POST",
  async (data, thunkAPI) => {
    try {
      const res = await axios.put(
        `${URI}/api/posts/${data.id}`,
        data.updateform,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: accesstoken,
            RefreshToken: refreshtoken,
          },
        }
      );
      console.log(res.data.data);
      return thunkAPI.fulfillWithValue(res.data.data);
    } catch (e) {
      console.log("캐치입니다");
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//게시글 좋아요
export const __likePost = createAsyncThunk("LIKE_POST", async (postId) => {
  await axios.post(`${URI}/api/like/posts/${postId}`, config);
  return postId;
});

// slice
const postsSlice = createSlice({
  name: "list",
  initialState: {
    data: [],
    success: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 게시글 리스트 조회(R)
      .addCase(__getPostList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(__getPostList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(__getPostList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //게시글 단건조회
      .addCase(__getPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(__getPost.fulfilled, (state, action) => {
        state.loading = false;
        const target = state.data.findIndex((post) => {
          return post.id == action.payload.id;
        });
        state.data.splice(target, 1, action.payload);
        state.success = true;
      })
      .addCase(__getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 게시글 등록(C)
      .addCase(__addPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(__addPost.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
        // state.data = action.payload;
        state.success = true;
      })
      .addCase(__addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 게시글 삭제 (D)
      .addCase(__deletePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(__deletePost.fulfilled, (state, action) => {
        state.data = state.data.filter((post) => post.id !== action.payload);
        state.success = true;
      })
      .addCase(__deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 게시글 수정(U)
      .addCase(__updatePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(__updatePost.fulfilled, (state, action) => {
        const target = state.data.findIndex((post) => {
          return post.id == action.payload.id;
        });
        console.log(target);
        state.data.splice(target, 1, action.payload);
      })
      .addCase(__updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
