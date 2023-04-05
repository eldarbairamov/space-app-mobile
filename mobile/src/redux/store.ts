import { configureStore } from "@reduxjs/toolkit";
import { authReducer, momentReducer, noteReducer, planReducer, taskReducer, userReducer } from "./slice";


export const store = configureStore({
   reducer: {
      authReducer,
      userReducer,
      noteReducer,
      planReducer,
      momentReducer,
      taskReducer
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
