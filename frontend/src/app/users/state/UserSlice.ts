import { createSlice } from "@reduxjs/toolkit";

import type { User } from "../types/user.type";

const initialState: User = { id: 0, name: "", email: "", bio: null, url: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
