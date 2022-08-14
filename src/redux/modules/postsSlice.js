import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



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

const initialState = {
  data: {
    content: "",
    username: "",
    id: 0,

  },
  isLoading: false,
  error: null,
};

export const commentSlice = createSlice({
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

export const { clearPost } = commentSlice.actions;
export default commentSlice.reducer;