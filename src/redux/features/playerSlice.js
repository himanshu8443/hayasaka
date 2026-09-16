import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  fullScreen: false,
  autoAdd: false,
  openedByClick: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      if(action.payload.song){
      state.activeSong = action.payload.song;
      }

      if(action.payload.data){
      state.currentSongs = action.payload.data;
      }

      if(action.payload.i !== undefined){
      state.currentIndex = action.payload.i;
      }
      state.isActive = true;
      state.openedByClick = true;
    },

    nextSong: (state, action) => {

      if(state.currentSongs.length>0){
      state.activeSong = state.currentSongs[action.payload];
    
      state.currentIndex = action.payload;
      state.isActive = true;
      state.openedByClick = false;
      }
    },

    prevSong: (state, action) => {

      if(state.currentSongs.length>0){
      state.activeSong = state.currentSongs[action.payload];
      state.currentIndex = action.payload;
      state.isActive = true;
      state.openedByClick = false;
      }
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    setFullScreen: (state, action) => {
      state.fullScreen = action.payload;
    },

    setAutoAdd: (state, action) => {
      state.autoAdd = action.payload;
    },

    resetOpenedByClick: (state) => {
      state.openedByClick = false;
    },
   
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, setFullScreen, setAutoAdd, resetOpenedByClick } = playerSlice.actions;

export default playerSlice.reducer;
