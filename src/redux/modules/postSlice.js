import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  card: [
    // {
    //   id: 1,
    //   title: "데이트룩입니다.",
    //   content: "데이트룩입니다. 그녀와의 첫만남",
    //   imgUrl:
    //     "https://images.mypetlife.co.kr/content/uploads/2018/07/09155937/KakaoTalk_20180720_165306472.jpg",
    // },
    // {
    //   id: 2,
    //   title: "평소룩입니다.",
    //   content: "평소룩입니다. 그녀와의 첫만남",
    //   imgUrl:
    //     "https://images.mypetlife.co.kr/content/uploads/2018/07/09155937/KakaoTalk_20180720_165306472.jpg",
    // },
  ],
  isLoading: false,
  error: null,
};

export const __getPostList = createAsyncThunk(
  "__getPostList",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/card");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getPostList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPostList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.card = action.payload;
      console.log(state.card);
    },
    [__getPostList.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});
export default postSlice.reducer;
