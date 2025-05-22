import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState = {
	isAuthenticated: false,
} as AuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: state => {
			state.isAuthenticated = true;
		},
		logout: state => {
			state.isAuthenticated = false;
		},
	},
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;