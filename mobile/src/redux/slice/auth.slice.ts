import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
   isLogin: boolean;
}

const initialState: IInitialState = {
   isLogin: false
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setIsLogin: (state, { payload }: PayloadAction<boolean>) => {
         state.isLogin = payload;
      }
   },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
