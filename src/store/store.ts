import { configureStore } from '@reduxjs/toolkit';
import myArticlesReducer from '../slices/myArticlesSlice';
import newsFromApiReducer from '../slices/newsFromApiSlice';

export const store = configureStore({
  reducer: {
    articles: myArticlesReducer,
    news: newsFromApiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;