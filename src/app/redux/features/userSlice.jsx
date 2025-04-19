// redux/features/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => doc.data());
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
