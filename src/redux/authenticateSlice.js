import { createSlice } from "@reduxjs/toolkit";

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState: {
    isAuthenticated: false,
    users: [
      { email: "abc@gmail.com", password: "123" },
      { email: "xyz@gmail.com", password: "p123" },
    ],
    currentUser: {
      email: "",
      password: "",
    },
  },
  reducers: {
    addUser: (state, action) => {
      console.log(action.payload);
      const newUser = {
        email: action.payload.email,
        password: action.payload.password,
      };
      state.users.push(newUser);
      state.isAuthenticated = true;
    },
    addCurrentUser: (state, action) => {
      state.currentUser.email = action.payload.email;
      state.currentUser.password = action.payload.password;
      state.isAuthenticated = true;
    },
    removeCurrentUser: (state, action) => {
      state.currentUser.email = "";
      state.currentUser.password = "";
      state.isAuthenticated = false;
    },
  },
});

export const { addUser, addCurrentUser, removeCurrentUser } =
  authenticateSlice.actions;

export default authenticateSlice.reducer;
