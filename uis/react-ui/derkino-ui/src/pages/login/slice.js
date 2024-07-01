import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '@/http/api';
import { setError } from '@/app/slice';

export const loginUser = createAsyncThunk(
  'login/user',
  async ({ username, password }, { dispatch }) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('error', true);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: formData,
      });

      if (response.redirected) {
        if (response.url.includes('/login?error')) {
          throw new Error('Invalid username or password');
        }
      }

      if (!response.ok) {
        throw new Error(data.error);
      }

    } catch (error) {
      dispatch(setError(error.message));
      
      throw error;
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: { 
    status: 'idle', 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
