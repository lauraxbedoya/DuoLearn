import { combineReducers } from "@reduxjs/toolkit";
import sessionReducer from "./slices/session.slice";

const appReducer = combineReducers({
  session: sessionReducer,
});

// export type RootState = ReturnType<typeof appReducer>;
export default appReducer;