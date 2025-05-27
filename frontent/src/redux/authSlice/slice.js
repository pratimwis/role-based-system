import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token:null,
    user: {
      username:"",
      profilePicture:"",
      role:""
    },
    isAuthenticated: false,
  },
  reducers: {
    setAuth: (state,action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
    },
    updateProfileImage: (state, action) => {
      if (state.user) {
        state.user.profilePicture = action.payload;
      }
    },
    
    logout: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
    },  
  },
})

// Action creators are generated for each case reducer function
export const { setAuth, updateProfileImage, logout } = authSlice.actions

export default authSlice.reducer