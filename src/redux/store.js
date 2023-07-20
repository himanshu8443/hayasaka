import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import loadingBarReducer from './features/loadingBarSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    loadingBar: loadingBarReducer,
  },
});
