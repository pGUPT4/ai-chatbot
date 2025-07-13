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
		setDeleteChats: (state, action) => {
			state.isDeleted = action.payload;
		}
	},
});

export const { setAuth, setLogout, setDeleteChats } = authSlice.actions;
export default authSlice.reducer;