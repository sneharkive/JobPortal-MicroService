import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import profileReducer from "./Slices/ProfileSlice";
import empProfileReducer from "./Slices/ProfileEmpSlice"
import filterReducer from "./Slices/FilterSlice";
import sortReducer from "./Slices/SortSlice";
import jwtReducer from "./Slices/JwtSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    profileEmp: empProfileReducer,
    profile: profileReducer,
    filter: filterReducer,
    sort: sortReducer,
    jwt: jwtReducer
  }
});