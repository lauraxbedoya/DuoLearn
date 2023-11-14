import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { User } from "../../src/utils/user/userInterface";
import { getApiHeader, handleApiError } from "../../helpers/api.helper";
import { User as FirebaseUser } from "firebase/auth";
import { BASE_API_URL } from "../../config/env";

const baseUrl = `${BASE_API_URL}/users/`;

export const signInUser = createAsyncThunk<
  void,
  { email: string; password: string }
>("session/signInUser", async (credential, { rejectWithValue, dispatch }) => {
  try {
    const url = `${baseUrl}login`;
    const respStream = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(credential),
    });
    const resp = await respStream.json();
    if (resp.token) {
      localStorage.setItem("tkn", resp.token);
      dispatch(findLoggedUser());
    }
  } catch (err) {
    return rejectWithValue(handleApiError(err as AxiosError));
  }
});

export const signInGoogleUser = createAsyncThunk<void, FirebaseUser>(
  "session/signInGoogleUser",
  async (firebaseUser, { rejectWithValue, dispatch }) => {
    const arrayName = firebaseUser.displayName?.split(" ") || "";
    const name = arrayName[0];
    const lastName = arrayName[1];
    try {
      const respStream = await fetch("auth/google", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name,
          lastName: lastName,
          email: firebaseUser.email,
          profileImage: firebaseUser.photoURL,
          // phoneNumber: firebaseUser.phoneNumber,
          googleId: firebaseUser.uid,
          createdFrom: "google_sign_in",
          // dateOfBirth: firebaseUser
        }),
      });
      const resp = await respStream.json();
      if (resp.data) {
        localStorage.setItem("tkn", resp.data);
        dispatch(findLoggedUser());
      }
    } catch (err) {
      return rejectWithValue(handleApiError(err as AxiosError));
    }
  }
);

export const registerUser = createAsyncThunk<
  void,
  { name: string; email: string; password: string; dateOfBirth: string }
>("session/registerUser", async (userInfo, { rejectWithValue, dispatch }) => {
  try {
    console.log(import.meta.env);
    const respStream = await fetch(baseUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userInfo),
    });
    const resp = await respStream.json();
    if (resp.token) {
      localStorage.setItem("tkn", resp.token);
      dispatch(findLoggedUser());
    }
  } catch (err) {
    return rejectWithValue(handleApiError(err as AxiosError));
  }
});

export const findLoggedUser = createAsyncThunk<User>(
  "session/findLoggedUser",
  async (_, { rejectWithValue }) => {
    try {
      const respStream = await fetch(`${baseUrl}me`, {
        method: "GET",
        headers: getApiHeader(),
      });
      const resp = await respStream.json();
      if (resp) {
        return resp;
      }
    } catch (err) {
      return rejectWithValue(handleApiError(err as AxiosError));
    }
  }
);
