import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import thunk from "redux-thunk";

import playerReducer from "./features/playerSlice";
import loadingBarReducer from "./features/loadingBarSlice";
import languagesReducer from "./features/languagesSlice";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["languages"],
};

const languagePersistedReducer = persistReducer(
  persistConfig,
  languagesReducer
);

export const store = configureStore({
  reducer: {
    player: playerReducer,
    loadingBar: loadingBarReducer,
    languages: languagePersistedReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
