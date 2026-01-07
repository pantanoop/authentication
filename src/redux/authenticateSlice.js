import { createSlice } from '@reduxjs/toolkit';

const authenticateSlice = createSlice({
  name: 'authenticate',
  initialState: {
    isLoggedIn: false,
    users: [
        {email: 'abc@gmail.com', password: '123'},
        {email: 'xyz@gmail.com', password: 'p123'}
    ],
    currentUser:{}
  },
  reducers: {
    login: (state) => {
    state.isLoggedIn = true;
      
    },
    registered: (state) => {
      state.isRegistered = true;
    },
    addUser:(state,action)=>{
      console.log(action.payload);
        const newUser={
            email: action.payload.email,    
            password: action.payload.password   
        }
        state.users.push(newUser);
    },
   
    
  },
})

export const { login, logout, addUser } = authenticateSlice.actions

export default authenticateSlice.reducer;