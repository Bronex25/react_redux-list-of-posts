/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { createPostComment } from './createCommentSlice';

type InitialState = {
  comments: Comment[];
  error: boolean;
  loading: boolean;
};

const initialState: InitialState = {
  comments: [],
  error: false,
  loading: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const deletePostComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    const value = await deleteComment(commentId);

    return value;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchComments.rejected, state => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });

    builder.addCase(deletePostComment.pending, (state, action) => {
      state.error = false;
      const commentId = action.meta.arg;

      state.comments = state.comments.filter(
        comment => comment.id !== commentId,
      );
    });
    builder.addCase(deletePostComment.rejected, state => {
      state.error = true;
    });

    builder.addCase(createPostComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
  },
});

export default commentsSlice.reducer;
