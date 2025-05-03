/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type InitialState = {
  users: User[];
  selectedUser: User | null;
};

const initialState: InitialState = {
  users: [],
  selectedUser: null,
};

export const fetchUsers = createAsyncThunk('user/fetchUser', async () => {
  const value = await getUsers();

  return value;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: builder =>
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    }),
});

export const { selectUser } = userSlice.actions;
export default userSlice.reducer;
