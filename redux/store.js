import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        newsData: newsReducer,
    }
});

export const news = persistStore(store);