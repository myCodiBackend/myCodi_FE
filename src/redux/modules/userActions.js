import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://13.125.217.64/api/members/login",
        { username, password },
        config
      );
      // store user's token in local storage
      console.log(res);
      localStorage.setItem("Authorization", res.headers.authorization); // 키의 이름, valuse
      localStorage.setItem("RefreshToken", res.headers.refreshtoken); //키 이름, value

      return res;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  // action type string
  "user/register",
  // callback function
  async ({ username, password, passwordConfirm }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // make request to backend
      await axios.post(
        "http://13.125.217.64/api/members/signup",
        { username, password, passwordConfirm },
        config
      );
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(
        `http://13.125.217.64/api/user/profile`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
