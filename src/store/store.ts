import { combineReducers, configureStore } from "@reduxjs/toolkit";
import isDev from "../utils/isDev.ts";
import companyReducer from "./companySlicer.ts";

const rootReducer = combineReducers({
  company: companyReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: isDev()
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
