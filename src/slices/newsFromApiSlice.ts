import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NewFromApi } from '../types/NewFromApi';
import { getNewsFromApi } from '../api/externalServerHelper';

export interface State {
  news: NewFromApi[];
  page: number;
  loaded: boolean;
  hasError: boolean;
}

export const init = createAsyncThunk( 'news/fetch',
  async (page: number) => {
    return getNewsFromApi(page);
})

const initialState: State = {
  news: [],
  page: 1,
  loaded: false,
  hasError: false,
};

const newsFromApiSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    increase: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.hasError = false;
        state.loaded = false;
        state.news = action.payload.articles;
      })
      .addCase(init.rejected, (state) => {
        state.loaded = false;
        state.hasError = true;
      })
  },
});

export const { increase } = newsFromApiSlice.actions;
export default newsFromApiSlice.reducer;