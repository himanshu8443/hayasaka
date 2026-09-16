import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  autoOpenFullscreen: false,
  defaultDownloadQuality: "ask",
  lyricsMode: "synced",
  separateLrcFile: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAutoOpenFullscreen: (state, action) => {
      state.autoOpenFullscreen = Boolean(action.payload);
    },
    setDefaultDownloadQuality: (state, action) => {
      state.defaultDownloadQuality = action.payload;
    },
    setLyricsMode: (state, action) => {
      state.lyricsMode = action.payload;
    },
    setSeparateLrcFile: (state, action) => {
      state.separateLrcFile = Boolean(action.payload);
    },
    resetSettings: (state) => {
      state.autoOpenFullscreen = false;
      state.defaultDownloadQuality = "ask";
      state.lyricsMode = "synced";
      state.separateLrcFile = false;
    },
  },
});

export const {
  setAutoOpenFullscreen,
  setDefaultDownloadQuality,
  setLyricsMode,
  setSeparateLrcFile,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
