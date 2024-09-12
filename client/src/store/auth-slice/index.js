import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';  // Import axios

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
};

export const registerUser = createAsyncThunk('/auth/register', async (formData) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
        withCredentials: true
    });
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;  // Set user based on the action payload
            state.isAuthenticated = true; // Set authenticated to true
        }
    },
    extraReducers: (builder) => 
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user; // Assuming response payload contains user data
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
