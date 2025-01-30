import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import newsReducer from "./Slices/newsSlice"; // Ensure correct path

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["usersData"], // Only persist this reducer
};

// Wrap reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, newsReducer);

// Configure store with middleware adjustments
export const store = configureStore({
  reducer: {
    usersData: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore persist actions
      },
    }),
});

// Persistor
export const persistor = persistStore(store);
