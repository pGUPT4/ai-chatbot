import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    isDeleted: boolean;
}

const initialState = {
	isAuthenticated: false,
	isDeleted: true,
} as AuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: state => {
			state.isAuthenticated = true;
		},
		setLogout: state => {
			state.isAuthenticated = false;
		},
		deleteChats: state => {
			state.isDeleted = false;
		}
	},
});

export const { setAuth, setLogout, deleteChats } = authSlice.actions;
export default authSlice.reducer;