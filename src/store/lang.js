import { createSlice } from "@reduxjs/toolkit";

const initialLangState = { isEnglish: false };

const langSlice = createSlice({
  name: "lang",
  initialState: initialLangState,
  reducers: {
    switchLang(state) {
      state.isEnglish = !state.isEnglish;
    },
  },
});

export const langActions = langSlice.actions;

export default langSlice.reducer;
