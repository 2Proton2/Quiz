import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        setAuth: (state, action) => {
            console.log('state is being called => ', action.payload)
            state.isAuthenticated = action.payload;
        },
        username: (state, action) => {
            state.name = action.payload
        }
    }
});

export default authSlice.reducer;
export const { setAuth } = authSlice.actions;