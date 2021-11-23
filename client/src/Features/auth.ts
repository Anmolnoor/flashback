import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// interface user {
// 	_id: string;
// 	name: string;
// }

interface post {
	_id: string;
	title: string;
	message: string;
	tags: string[];
	likes: string[];
	creator: string;
	name: string;
}
interface loadUserint {
	user: post;
	token: string;
}

interface AuthState {
	error: string | null;
	loading: boolean;
	isAuthenticated: boolean;
	user: post | null;
	token: string | null;
}

const initialState: AuthState = {
	user: {
		_id: "string",
		title: "string",
		message: "string",
		tags: ["string[]"],
		likes: ["string[]"],
		creator: "string",
		name: "string"
	},
	token: "",
	error: null,
	loading: false,
	isAuthenticated: false
};

export const loginUser = createAsyncThunk(
	"auth/login",
	async (payload: { email: string; password: string }, { rejectWithValue }) => {
		const res = await axios.post("http://localhost:1337/user/signin", payload);
		if (res.status === 200) {
			console.log(res.data);
			return res.data;
		}
		return rejectWithValue(res.data);
	}
);

export const registerUser = createAsyncThunk(
	"auth/register",
	async (payload: { email: string; password: string }, { rejectWithValue }) => {
		const res = await axios.post("http://localhost:1337/user/signup", payload);
		if (res.status === 200) {
			console.log(res.data);
			return res.data;
		}
		return rejectWithValue(res.data);
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loadUser: (state, action: PayloadAction<loadUserint>) => {
			action.payload.token ? (state.isAuthenticated = true) : (state.isAuthenticated = false);
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
		logout: (state) => {
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			localStorage.removeItem("name");
			localStorage.removeItem("id");
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		}
	},
	extraReducers: {
		[loginUser.pending.type]: (state) => {
			state.loading = true;
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		},
		[loginUser.fulfilled.type]: (state, action: PayloadAction<{ result: post; token: string }>) => {
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("user", JSON.stringify(action.payload.result));
			localStorage.setItem("name", String(action.payload.result.name));
			localStorage.setItem("id", action.payload.result._id);
			state.loading = false;
			state.isAuthenticated = true;
			state.user = action.payload.result;
			state.token = action.payload.token;
		},
		[loginUser.rejected.type]: (state, action: PayloadAction<{ error: string }>) => {
			console.log(action);
			state.loading = false;
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		},
		[registerUser.pending.type]: (state) => {
			state.loading = true;
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		},
		[registerUser.fulfilled.type]: (state, action: PayloadAction<{ result: post; token: string }>) => {
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("user", JSON.stringify(action.payload.result));
			state.loading = false;
			state.isAuthenticated = true;
			state.user = action.payload.result;
			state.token = action.payload.token;
		},
		[registerUser.rejected.type]: (state, action: PayloadAction<{ error: string }>) => {
			state.loading = false;
			console.log(action);
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		}
	}
});

// reduces here are the actions that can be dispatched
export const { logout, loadUser } = authSlice.actions;

// reducers here are the actions that can be dispatched
export default authSlice.reducer;
export type RootState = ReturnType<typeof authSlice.reducer>;
export type AppDispatch = typeof authSlice.actions;
