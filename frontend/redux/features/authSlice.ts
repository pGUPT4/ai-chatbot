import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
	interactionCount?: number;
}

const initialState = {
	isAuthenticated: false,
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
		}
		// setDeleted: (state, action) => {
		// 	state.isDeleted = action.payload;
		// }
	},
});

export const { setAuth, setLogout } = authSlice.actions;
export default authSlice.reducer;