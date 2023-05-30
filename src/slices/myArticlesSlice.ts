import { ArticleRequest } from "./../types/ArticleRequest";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addArticle,
  deleteArticle,
  getArticles,
  updateArticle,
  updatePinnedArticles,
} from "../api/serverHelper";
import { Article } from "../types/Article";

export interface State {
  articles: Article[];
  pinnedId: number;
  selectedArticle: Article | null;
  loaded: boolean;
  hasError: boolean;
  query: string;
}

export const init = createAsyncThunk("articles/fetch", async () => {
  return getArticles();
});

export const createArticle = createAsyncThunk(
  "articles/create",
  async (article: Omit<ArticleRequest, "id">) => {
    const newArticle = {
      ...article,
      isPinned: false,
      id: 0,
    };
    return addArticle(newArticle);
  }
);

export const updateArticleAsync = createAsyncThunk(
  "articles/update",
  async (article: Article) => {
    return updateArticle(article.id, article);
  }
);

export const updatePinnedArticlesAsync = createAsyncThunk(
  "articles/updatePinnedArticles",
  async ( articlesToUpdate : Article[]) => {
    return updatePinnedArticles(articlesToUpdate);
  }
);

export const deleteArticleAsync = createAsyncThunk(
  "articles/delete",
  async (articleId: number) => {
    deleteArticle(articleId);

    return articleId;
  }
);

const initialState: State = {
  articles: [],
  loaded: false,
  hasError: false,
  pinnedId: 0,
  selectedArticle: null,
  query: "",
};

const myArticlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setSelectedArticle: (state, action: PayloadAction<Article | null>) => {
      state.selectedArticle = action.payload;
    },
    setPinnedId: (state, action: PayloadAction<number>) => {
      state.pinnedId = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
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
        state.articles = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.loaded = false;
        state.hasError = true;
      })

      .addCase(createArticle.pending, (state) => {
        state.loaded = true;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.articles.push(action.payload);
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(createArticle.rejected, (state) => {
        state.hasError = true;
        state.loaded = false;
      })

      .addCase(updateArticleAsync.pending, (state) => {
        state.loaded = true;
      })
      .addCase(updateArticleAsync.fulfilled, (state, action) => {
        const updatedArticle = action.payload;
        const index = state.articles.findIndex(
          (article) => article.id === updatedArticle.id
        );
        if (index !== -1) {
          state.articles[index] = updatedArticle;
        }
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(updateArticleAsync.rejected, (state) => {
        state.hasError = true;
        state.loaded = false;
      })

      .addCase(updatePinnedArticlesAsync.pending, (state) => {
        state.loaded = true;
      })
      .addCase(updatePinnedArticlesAsync.fulfilled, (state, action) => {
        const updatedArticles = action.payload;
        state.articles = state.articles.map(article => {
          for (let i = 0; i < updatedArticles.length; i++) {
            if(article.id === updatedArticles[i].id) {
              return updatedArticles[i];
            }
          }
          return article;
        });
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(updatePinnedArticlesAsync.rejected, (state) => {
        state.hasError = true;
        state.loaded = false;
      })

      .addCase(deleteArticleAsync.pending, (state) => {
        state.loaded = true;
      })
      .addCase(deleteArticleAsync.fulfilled, (state, action) => {
        state.articles = state.articles.filter(
          (article) => article.id !== action.payload
        );
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(deleteArticleAsync.rejected, (state) => {
        state.hasError = true;
        state.loaded = false;
      });
  },
});

export const {
  setPinnedId,
  setSelectedArticle,
  setQuery,
} = myArticlesSlice.actions;
export default myArticlesSlice.reducer;
