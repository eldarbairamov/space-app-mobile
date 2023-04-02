import { configureStore } from "@reduxjs/toolkit";
import { authReducer, momentReducer, noteReducer, planReducer, userReducer } from "./slice";


export const store = configureStore({
   reducer: {
      authReducer,
      userReducer,
      noteReducer,
      planReducer,
      momentReducer
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
