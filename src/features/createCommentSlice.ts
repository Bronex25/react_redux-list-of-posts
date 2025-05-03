/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment } from '../api/comments';
import { CommentData } from '../types/Comment';

export const createPostComment = createAsyncThunk(
  'comments/createComment',
  async ({ name, email, body, postId }: CommentData) => {
    const value = await createComment({
      name,
      email,
      body,
      postId,
    });

    return value;
  },
);

const initialState = {
  error: false,
  loading: false,
};

const createCommentSlice = createSlice({
  name: 'add/comment',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(createPostComment.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(createPostComment.rejected, state => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(createPostComment.fulfilled, state => {
      state.loading = false;
    });
  },
});

export default createCommentSlice.reducer;
