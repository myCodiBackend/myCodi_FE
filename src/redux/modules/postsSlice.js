import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../shared/Request";


const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;


  let config = {
    headers: {
        "Authorization": userToken
    }
  }


// 게시글 리스트
export const __getPostList = createAsyncThunk("GET_POSTS", async () => {
  const response = await axios.get(` http://localhost:5001/posts`);
  // 전체 포스트 리스트
  return response.data;
});


// // 게시글 리스트 백서버쪽
// export const __getPostList = createAsyncThunk("GET_POSTS", async () => {
//   const response = await instance.get("/post");
//   // 전체 포스트 리스트
//   return response.data;
// });


//게시글 단건 조회 백엔드쪽
export const __getPost =createAsyncThunk("GET_POST", async (postId)=> {
  const response = await instance.get(`/api/posts/${postId}`);
  return response.data;
});




//게시글 등록
export const __addPost = createAsyncThunk("ADD_POST", async (new_post_list) => {
  const response = await axios.post(
    ` http://localhost:5001/posts`,
    new_post_list
  );
  // 전체 포스트 리스트
  return response.data;
});

//게시글 등록 백엔드쪽
// export const __addPost = createAsyncThunk("ADD_POST", async (new_post_list) => {
//   const response = await instance.post(
//     "/api/posts",
//     new_post_list, config
//   );
//   // 전체 포스트 리스트
//   return response.data;
// });




// 게시글 삭제
export const __deletePost = createAsyncThunk("DELETE_POST", async (postId) => {
  await axios.delete(` http://localhost:5001/posts/${postId}`);

  // 포스트 아이디
  return postId;
});


// // 게시글 삭제 백엔드쪽
// export const __deletePost = createAsyncThunk("DELETE_POST", async (postId) => {
//   await instance.delete(`/api/posts/${postId}`);
//   // 포스트 아이디
//   return postId;
// });



//게시글 수정
export const __updatePost = createAsyncThunk(
  "UPDATE_POST",
  async ({ id, author, title, content }) => {
    await axios.put(` http://localhost:5001/posts/${id}`,
     {
      id: id,
      author: author,
      title: title,
      content: content,
    },
    config);

    return { id, author, title, content };
  }
);



// //게시글 수정 백엔드쪽
// export const __updatePost = createAsyncThunk(
//   "UPDATE_POST",
//   async ({id,formdata}) => {
//     await instance.put(`/api/posts/${id}`,
//     formdata,
//     {
//       headers: {
//           "Authorization": userToken,
//           "Content-Type": "multipart/form-data"
//       }
//     });

//     return { id, author, title, content };
//   }
// );





// slice
const postSlice = createSlice({
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
          return (post.id = action.payload.id);
        });
        state.data = state.data.splice(target, 1, action.payload);
      })
      .addCase(__updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
