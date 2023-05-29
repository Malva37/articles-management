/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "./ArticlesList.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { filterArticles } from "../../utils/filterArticles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as articleActions from "../../slices/myArticlesSlice";
import { Article } from "../../types/Article";
import { Loader } from "../Loader";

export const ArticlesList: React.FC = () => {
  const { articles, loaded, hasError, query, pinnedId } = useAppSelector(
    (state) => state.articles
  );
  const [visibleArticles, setVisibleArticles] = useState<Article[]>([]);
  const dispatch = useAppDispatch();

  const deleteArticle = (id: number) => {
    dispatch(articleActions.deleteArticleAsync(id));
  };

  const handleSelectArticle = (article: Article | null) => {
    dispatch(articleActions.setSelectedArticle(article));
  };

  useEffect(() => {
    const preparedArticles = filterArticles(articles, pinnedId, query);

    setVisibleArticles(preparedArticles);
  }, [articles, pinnedId, query]);

  useEffect(() => {
    dispatch(articleActions.init());
    dispatch(articleActions.setSelectedArticle(null));
  }, []);

  if (loaded) {
    return <Loader />;
  }
  
  if (hasError) {
    return (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong!
      </div>
    );
  }

  if (!articles.length) {
    return (
      <>
        <h1 className="title">There is no articles yeat</h1>
        <h2 className="subtitle">
          {" "}
          <Link to="/add">You can add some...</Link>
        </h2>
      </>
    );
  }

  return (
    <>
      <nav className="pb-3 navbar is-expanded" role="navigation">
        <div className="navbar-item ">
          <div className="control is-expanded">
            <input className="input" type="text" placeholder="Type a city" />
          </div>
        </div>
      </nav>

      <div className="columns is-multiline">
        {visibleArticles.map((article) => (
          <div
            className="column is-one-third-desktop is-half-tablet is-full-mobile"
            key={article.id}
          >
            <div className="card">
              <div className="card-header">
                <div className="card-header-title">{article.title}</div>
                <p className="buttons">
                  {article.isPinned ? (
                    <button
                      className="button"
                      title="De pinned"
                      onClick={() => {
                        dispatch(articleActions.setPinnedId(article.id));
                      }}
                    >
                      <span className="icon">
                        <i className="fa-solid fa-toggle-on"></i>
                      </span>
                    </button>
                  ) : (
                    <button
                      className="button"
                      title="Pinned"
                      onClick={() => {
                        dispatch(articleActions.setPinnedId(article.id));
                      }}
                    >
                      <span className="icon">
                        <i className="fa-solid fa-toggle-off"></i>
                      </span>
                    </button>
                  )}
                  <button
                    className="button"
                    onClick={() => {
                      handleSelectArticle(article);
                    }}
                  >
                    <span className="icon">
                      <Link to="add">
                        <i className="fas fa-edit"></i>
                      </Link>
                    </span>
                  </button>

                  <button
                    className="button"
                    onClick={() => {
                      deleteArticle(article.id);
                    }}
                  >
                    <span className="icon">
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </button>
                </p>
              </div>
              <div className="card-image">
                <figure className="image is-3by1">
                  {article.image ? (
                    <img src={article.image.toString()} alt={article.title} />
                  ) : (
                    <img
                      src="https://bulma.io/images/placeholders/256x256.png"
                      alt={article.title}
                    />
                  )}
                </figure>
              </div>
              <div className="card-content">
                <p>Author: {article.author}</p>
                <div className="content">{article.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
