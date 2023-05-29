import { configureStore } from '@reduxjs/toolkit';
import myArticlesReducer from '../slices/myArticlesSlice';

export const store = configureStore({
  reducer: {
    articles: myArticlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;