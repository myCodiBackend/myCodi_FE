import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const __getmember = createAsyncThunk(
    "GET_MEMBER",
    async (arg, thunkAPI) => {
      try {
        const { data } = await axios.get(`http://localhost:5001/members?todoId=${arg}`);
        return thunkAPI.fulfillWithValue(data);
      } catch (e) {
        return thunkAPI.rejectWithValue(e.code);
      }
    }
  );