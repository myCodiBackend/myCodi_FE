import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import instance from "../../shared/Request";

const accesstoken = localStorage.getItem("Authorization")
  ? localStorage.getItem("Authorization")
  : null;
const refreshtoken = localStorage.getItem("RefreshToken");
// console.log(accesstoken);

let config = {
  headers: {
    Authorization: accesstoken,
  },
};

// -------------------- 개발용

// ---------------------------------------------------게시글 조회

// export const __getPostList = createAsyncThunk("GET_POSTS", async () => {
//   const response = await axios.get(` http://localhost:5001/posts`);
//   // 전체 포스트 리스트
//   return response.data;
// });

// ----------------------------------------------게시글 등록

// export const __addPost = createAsyncThunk("ADD_POST", async (new_post_list) => {
//   const response = await axios.post(
//     ` http://localhost:5001/posts`,
//     new_post_list
//   );

//   return response.data;
// });

// ----------------------------------------------------게시글 삭제

// export const __deletePost = createAsyncThunk("DELETE_POST", async (postId) => {
//   await axios.delete(` http://localhost:5001/posts/${postId}`);

//   // 포스트 아이디
//   return postId;
// });

// ------------------------------------------게시글 수정

// export const __updatePost = createAsyncThunk(
//   "UPDATE_POST",
//   async ({ id, img, title, content }) => {
//     await axios.put(
//       ` http://localhost:5001/posts/${id}`,
//       {
//         id,
//         img,
//         title,
//         content,
//       },
//       config
//     );

//     return { id, img, title, content };
//   }
// );

// -------------------- 배포용

// -------------------------------------게시글 조회
export const __getPostList = createAsyncThunk("GET_POSTS", async () => {
  const response = await axios.get("http://13.125.217.64/api/posts");
  // 전체 포스트 리스트

  return response.data.data;
});

// ----------------------------------------게시글 등록
export const __addPost = createAsyncThunk("ADD_POST", async () => {
  const res = await axios.post("http://13.125.217.64/api/posts", {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: accesstoken,
      RefreshToken: refreshtoken,
    },
  });
  console.log(res.data);
  return res.data;
});

// ----------------------------------------- 게시글 삭제
export const __deletePost = createAsyncThunk("DELETE_POST", async (postId) => {
  await axios.delete(`http://13.125.217.64/api/posts/${postId}`, {
    headers: {
      "Content-Type": "a/form-data",
      Authorization: accesstoken,
      RefreshToken: refreshtoken,
    },
  });
  // 포스트 아이디
  return postId;
});

// ----------------------------------------------게시글 수정
export const __updatePost = createAsyncThunk(
  "UPDATE_POST",
  async ({ id, formdata }) => {
    const res = await axios.put(
      `http://13.125.217.64/api/posts/${id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accesstoken,
          RefreshToken: refreshtoken,
        },
      }
      // formdata,
      // {
      //   headers: {
      //     Authorization: accesstoken,
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );

    return res;
  }
);

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
        // 리스트 전체 저장
        state.data = action.payload;
        state.success = true;
      })
      .addCase(__getPostList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 게시글 등록(C)
      .addCase(__addPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(__addPost.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
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
          return post.id === Number(action.payload.id);
        });
        state.data.splice(target, 1, action.payload);
      })
      .addCase(__updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
