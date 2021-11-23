import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface post {
	_id: string;
	title: string;
	message: string; // this is changes for content
	tags: string[];
	likes: string[];
	selectedFile: string;
	creator: string;
	createdAt: string;
	createdby: string;
}

interface Posts {
	data: post[];
	loading: boolean;
	currentPage: number;
	numberofPages: number;
}

interface postState {
	posts: Posts;
}

const initialState: postState = {
	posts: {
		data: [],
		loading: true,
		currentPage: 1,
		numberofPages: 1
	}
};

export const FetchPosts = createAsyncThunk(
	"post/fetchPosts",
	async (payload: { page: number }, { rejectWithValue }) => {
		const res = await fetch(`http://localhost:1337/posts?page=${payload.page}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (res.status === 200) {
			const data = await res.json();
			return data;
		}
		return rejectWithValue(res.status);
	}
);

interface deletepost {
	_id: string;
}

export const DeletePost = createAsyncThunk("post/deletePost", async (payload: { id: string }, { rejectWithValue }) => {
	const token = localStorage.getItem("token");
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	};
	const res = await axios.delete(`http://localhost:1337/posts/${payload.id}`, config);

	if (res.status === 200) {
		return { _id: payload.id };
	}
	return rejectWithValue(res.status);
});

interface CreatePostint {
	title: string;
	message: string;
	tags: string[];
	selectedFile: string;
	creator: string;
}

export const CreatePost = createAsyncThunk("post/createPost", async (payload: CreatePostint, { rejectWithValue }) => {
	// axios post with jwt token
	const token = localStorage.getItem("token");
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	const res = await axios.post("http://localhost:1337/posts", payload, config);
	if (res.status === 201) {
		console.log(res.data);
		return res.data;
	}
	return rejectWithValue(res.status);
});

interface likePostInt {
	postId: string;
}

export const LikePost = createAsyncThunk("post/LikePost", async (payload: likePostInt, { rejectWithValue }) => {
	const token = localStorage.getItem("token");
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const res = await axios.patch(`http://localhost:1337/posts/likePost/${payload.postId}`, payload, config);

	// if (res.status === 403) {
	// 	console.log({ "like post ": res.data });
	// 	return res.data;
	// }

	if (res.status === 200) {
		console.log({ "like post ": res.data });
		return res.data;
	}
	return rejectWithValue(res.status);
});

interface search {
	search: string;
	tags: string;
}

export const SearchPost = createAsyncThunk("post/SearchPosts", async (payload: search, { rejectWithValue }) => {
	try {
		const res = await axios.get(
			`http://localhost:1337/posts/search?searchQuery=${payload.search || "none"}&tags=${payload.tags || "none"}`
		);

		if (res.status === 200) {
			console.log({ "Searched posts ": res.data });
			return res.data;
		}
		return rejectWithValue(res.status);
	} catch (error) {
		console.log(error);
	}
});

export const SinglePost = createAsyncThunk("post/SinglePost", async (payload: { id?: string }, { rejectWithValue }) => {
	try {
		const res = await axios.get(`http://localhost:1337/posts/${payload.id}`);

		if (res.status === 200) {
			console.log({ "Single post ": res.data });
			return res.data;
		}
		return rejectWithValue(res.status);
	} catch (error) {
		console.log(error);
	}
});

const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {},
	extraReducers: {
		[FetchPosts.pending.type]: (state) => {
			state.posts.loading = true;
		},
		[FetchPosts.fulfilled.type]: (state, action: PayloadAction<Posts>) => {
			console.log(action.payload);
			state.posts.data = action.payload.data;
			state.posts.loading = false;
			state.posts.currentPage = action.payload.currentPage;
			state.posts.numberofPages = action.payload.numberofPages;
		},
		[FetchPosts.rejected.type]: (state, action: PayloadAction<number>) => {
			state.posts.loading = false;
		},
		[CreatePost.pending.type]: (state) => {
			state.posts.loading = true;
		},
		[CreatePost.fulfilled.type]: (state, action: PayloadAction<post>) => {
			console.log({ "create post ": action.payload, old: state.posts.data });
			state.posts.data = [action.payload, ...state.posts.data];
			state.posts.loading = false;
		},
		[CreatePost.rejected.type]: (state, action: PayloadAction<number>) => {
			console.log(action.payload);
			state.posts.loading = false;
		},
		[DeletePost.pending.type]: (state) => {},
		[DeletePost.fulfilled.type]: (state, action: PayloadAction<deletepost>) => {
			console.log({ "from delete fxn": action.payload._id });
			state.posts.data = [...state.posts.data.filter((post) => post._id !== action.payload._id)];
			state.posts.loading = false;
		},
		[DeletePost.rejected.type]: (state, action: PayloadAction<number>) => {
			console.log(action.payload);
			state.posts.loading = false;
		},
		[LikePost.fulfilled.type]: (state, action: PayloadAction<post>) => {
			state.posts.data = [...state.posts.data.filter((post) => post._id !== action.payload._id)];
			state.posts.data = [action.payload, ...state.posts.data];
		},
		[SearchPost.pending.type]: (state, action: PayloadAction<search>) => {
			state.posts.loading = true;
		},
		[SearchPost.fulfilled.type]: (state, action: PayloadAction<Posts>) => {
			state.posts.data = action.payload.data;
			state.posts.loading = false;
		},
		[SearchPost.rejected.type]: (state, action: PayloadAction<number>) => {
			console.log(action.payload);
			state.posts.loading = false;
		},
		[SinglePost.pending.type]: (state) => {
			state.posts.loading = true;
		},
		[SinglePost.fulfilled.type]: (state, action: PayloadAction<post>) => {
			state.posts.loading = false;
			state.posts.data = [action.payload];
		}
	}
});

// export const { fetchPosts, createPost, updatePost, likePost, deletePost } = postSlice.actions;
export default postSlice.reducer;

export type RootState = ReturnType<typeof postSlice.reducer>;
export type AppDispatch = typeof postSlice.actions;
