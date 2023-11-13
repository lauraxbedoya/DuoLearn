import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { User } from '../../src/utils/user/userInterface';
import { handleApiError } from '../../helpers/api.helper';
import { User as FirebaseUser } from 'firebase/auth';
import { BASE_API_URL } from '../../config/env';


export const signInUser = createAsyncThunk<
  void,
  { email: string; password: string }
>('session/signInUser', async (credential, { rejectWithValue, dispatch }) => {
  try {
    const url = `${BASE_API_URL}/users/login`;
    const respStream = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(credential)
    })
    const resp = await respStream.json();
    if (resp.token) {
      localStorage.setItem('tkn', resp.token);
      dispatch(findLoggedUser());
    }
  } catch (err) {
    return rejectWithValue(handleApiError(err as AxiosError));
  }
});

export const signInGoogleUser = createAsyncThunk<void, FirebaseUser>(
  'session/signInGoogleUser',
  async (firebaseUser, { rejectWithValue, dispatch }) => {
    const arrayName = firebaseUser.displayName?.split(' ') || '';
    const name = arrayName[0];
    const lastName = arrayName[1];
    try {
      const respStream = await fetch('auth/google', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          lastName: lastName,
          email: firebaseUser.email,
          profileImage: firebaseUser.photoURL,
          // phoneNumber: firebaseUser.phoneNumber,
          googleId: firebaseUser.uid,
          createdFrom: 'google_sign_in',
          // dateOfBirth: firebaseUser
        })
      })
      const resp = await respStream.json();
      if (resp.data) {
        localStorage.setItem('tkn', resp.data);
        dispatch(findLoggedUser());
      }
    } catch (err) {
      return rejectWithValue(handleApiError(err as AxiosError));
    }
  },
);

export const findLoggedUser = createAsyncThunk<User>(
  'session/findLoggedUser',
  async (_, { rejectWithValue }) => {
    try {
      const respStream = await fetch('users/me', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      })
      const resp = await respStream.json();
      if (resp.data) {
        return resp.data;
      }
    } catch (err) {
      return rejectWithValue(handleApiError(err as AxiosError));
    }
  },
);
