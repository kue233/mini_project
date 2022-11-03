import { combineReducers } from "@reduxjs/toolkit";
import bankReducer from "./bankReducer";
import profileReducer from "./profileReducer";

const reducers = combineReducers({
  bank: bankReducer,
  profile: profileReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
