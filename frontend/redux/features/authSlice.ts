import { createSlice } from '@reduxjs/toolkit';
import { set } from 'lodash';

interface AuthState {
    isAuthenticated: boolean;
	isDeleted: boolean;
	interactionCount?: number;
}

const initialState = {
	isAuthenticated: false,
	isDeleted: false,
	interactionCount: 0,
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
		setDeleted: (state, action) => {
			state.isDeleted = action.payload;
		}
	},
});

export const { setAuth, setLogout, setDeleted } = authSlice.actions;
export default authSlice.reducer;