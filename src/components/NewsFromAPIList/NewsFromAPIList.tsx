/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "./NewsFromAPIList.css";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as newsActions from "../../slices/newsFromApiSlice";
import { Loader } from "../Loader";

export const NewsFromAPIList: React.FC = () => {
  const { news, page, loaded, hasError } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  useEffect(() => {  
    dispatch(newsActions.init(page));
  }, [page]);

  if (loaded) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className="notification is-danger">
        Something went wrong!
      </div>
    );
  }

  if (!news.length) {
    return <h1 className="title">There is no articles</h1>;
  }

  const handleChangePage = () => {
    dispatch(newsActions.increase());
  }

  return (
    <>
      <nav
        className="navbar is-flex is-justify-content-end"
        role="navigation"
        aria-label="pagination"
      >
        <button 
          className="pagination-next "
          onClick={() => {
            handleChangePage()
          }}
        >
          Load 10 new articles
        </button>
      </nav>

      <div className="columns is-multiline">
        {news.map((oneNews, index) => (
          <div
            className="column is-one-third-desktop is-half-tablet is-full-mobile"
            key={`${oneNews.title}-${index}`}
          >
            <div className="card">
              <div className="card-header">
                <div className="card-header-title">{oneNews.title}</div>
              </div>
              <div className="card-image">
                <figure className="image is-4by1">
                  {oneNews.urlToImage ? (
                    <img
                      src={oneNews.urlToImage.toString()}
                      alt={oneNews.title}
                    />
                  ) : (
                    <img
                      src="https://bulma.io/images/placeholders/256x256.png"
                      alt={oneNews.title}
                    />
                  )}
                </figure>
              </div>
              <div className="card-content">
                <p>Author: {oneNews.author}</p>
                <div className="content description">{oneNews.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

