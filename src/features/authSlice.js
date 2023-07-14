import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const loginAPI='https//akmikajmas/akninsa/aba' //sample api
// pls note that we are using an invalid api just for the sake of learning
// we will sign in the user when we get error just for learning sake
export const login = createAsyncThunk('auth/login', async (credentials) => {
    try {
      const response = await axios.post(loginAPI, credentials); // API call to login endpoint
      return response.data; // Return user data from response
    } catch (error) {
    //   Handle login error
    //   throw Error(error.message);
    return {
        user: 'Kamshinen',
        date: 'today'
    }
    }
  });

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userData: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        // below is just for learning sake, it should be in the case above
        state.userData = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
