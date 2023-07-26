import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import loadingBarReducer from './features/loadingBarSlice';
import languagesReducer from './features/languagesSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    loadingBar: loadingBarReducer,
    languages: languagesReducer,
  },
});
