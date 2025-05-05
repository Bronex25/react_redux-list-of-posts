/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type InitialState = {
  posts: Post[];
  selectedPost: Post | null;
  error: string | null;
  loading: boolean;
};

const initialState: InitialState = {
  posts: [] as Post[],
  selectedPost: null,
  error: null,
  loading: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchposts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPosts.rejected, state => {
      state.error = 'Failed to fetch posts';
      state.loading = false;
    });
  },
});

export const { selectPost } = postsSlice.actions;
export default postsSlice.reducer;
