import { configureStore } from "@reduxjs/toolkit";

//  import Reducers Slice from reducers
import authSlice from "../Features/auth";
import postSlice from "../Features/post";

export const store = configureStore({
	reducer: {
		auth: authSlice,
		post: postSlice
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store.dispatch(FetchPosts)
