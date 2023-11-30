import { createSlice } from '@reduxjs/toolkit';
import { ToastMessage } from 'primereact/toast';

export interface CommonState {
  loading: boolean;
  toast?: ToastMessage | null;
}

const initialState: CommonState = {
  loading: false,
  toast: undefined,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setToast: (state, { payload }) => {
      state.toast = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { setToast, setLoading } = commonSlice.actions;
export default commonSlice.reducer;
