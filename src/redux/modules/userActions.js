import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const userLogin = createAsyncThunk(
    'user/login',
    async ({ username, password }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const res = await axios.post(
          '/api/user/login',
          { username, password },
          config
        )
        // store user's token in local storage
        localStorage.setItem('userToken', res.headers.Authentication )
        return res
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

export const registerUser = createAsyncThunk(
    // action type string
    'user/register',
    // callback function
    async ({  username, password }, { rejectWithValue }) => {
    try {
    // configure header's Content-Type as JSON
    const config = {
    headers: {
    'Content-Type': 'application/json',
    },
    }
    // make request to backend
    await axios.post(
    '/api/user/register',
    { username, password },
    config
    )
    } catch (error) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
    return rejectWithValue(error.response.data.message)
    } else {
    return rejectWithValue(error.message)
    }
    }
    
    }
    )


    export const getUserDetails = createAsyncThunk(
        'user/getUserDetails',
        async (arg, { getState, rejectWithValue }) => {
          try {
            // get user data from store
            const { user } = getState()
      
            // configure authorization header with user's token
            const config = {
              headers: {
                Authorization: `Bearer ${user.userToken}`,
              },
            }
            const { data } = await axios.get(`/api/user/profile`, config)
            return data
          } catch (error) {
            if (error.response && error.response.data.message) {
              return rejectWithValue(error.response.data.message)
            } else {
              return rejectWithValue(error.message)
            }
          }
        }
      )