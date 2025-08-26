import { createSlice } from '@reduxjs/toolkit'
import { updateEmpProfile } from '../Service/ProfileEmpService';

const ProfileEmpSlice = createSlice({
  name: 'profileEmp',
  initialState: {},

  reducers: {
    changeEmpProfile: (state, action) => {
      state = updateEmpProfile(action.payload);
      return action.payload;
    },
    setEmpProfile: (state, action) => {
      state = action.payload;
      return state;
    }
  }
})
export const { changeEmpProfile, setEmpProfile } = ProfileEmpSlice.actions;
export default ProfileEmpSlice.reducer;
