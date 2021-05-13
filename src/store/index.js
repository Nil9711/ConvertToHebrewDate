import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./lang";

const store = configureStore({
  reducer: { language: langReducer },
});

export default store;
