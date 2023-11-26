import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../src/utils/interfaces/user/user";
import {
  findLoggedUser,
  registerUser,
  signInUser,
} from "../actions/session.action";

export interface SessionState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  error: string | undefined;
}

const initialState: SessionState = {
  user: null,
  isAuthenticated: false,
  isAuthenticating: true,
  loading: false,
  error: undefined,
};

export const stateLoadingHandler = (state: SessionState) => {
  state.loading = true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stateErrorHandler = (state: SessionState, err: any) => {
  state.loading = false;
  state.error = err.error.message;
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    clearSession: (state) => {
      state.user = initialState.user;
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.isAuthenticated = initialState.isAuthenticated;
      localStorage.removeItem("tkn");
    },
  },
  extraReducers(builder) {
    // login
    builder.addCase(signInUser.pending, stateLoadingHandler);
    builder.addCase(signInUser.rejected, stateErrorHandler);
    // register
    builder.addCase(registerUser.pending, stateLoadingHandler);
    builder.addCase(registerUser.rejected, stateErrorHandler);
    // findLoggedUser
    builder.addCase(
      findLoggedUser.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.user = payload;
        state.isAuthenticated = true;
        state.isAuthenticating = false;
        state.loading = false;
      }
    );
    builder.addCase(findLoggedUser.pending, (state: SessionState) => {
      state.loading = true;
      state.isAuthenticating = true;
    });
    builder.addCase(
      findLoggedUser.rejected,
      (state: SessionState, err: any) => {
        state.loading = false;
        state.error = err.error.message;
        state.isAuthenticating = false;
      }
    );
  },
});

export const { clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
