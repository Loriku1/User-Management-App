import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || [], 
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      localStorage.setItem('users', JSON.stringify(state.users)); 
    },
    addUser: (state, action) => {
      state.users.unshift(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users)); 
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        localStorage.setItem('users', JSON.stringify(state.users)); 
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(u => u.id !== action.payload);
      localStorage.setItem('users', JSON.stringify(state.users)); 
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
