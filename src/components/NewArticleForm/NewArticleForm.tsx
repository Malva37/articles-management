/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ArticleRequest } from "../../types/ArticleRequest";
import { Modal } from "../Modal";
import { TextField } from "../TextField";
import * as articleActions from "../../slices/myArticlesSlice";
import { Article } from "../../types/Article";

export const NewArticleForm: React.FC = () => {
  const { selectedArticle } = useAppSelector((state) => state.articles);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | File>("");
  const [selectedFile, setSelectedFile] = useState<File | string>("");

  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        closeModal();
      }, 2000);

      return () => clearTimeout(timer);
    }
    return () => {};
  }, [showModal]);

  useEffect(() => {
    if (selectedArticle) {
      fillForm();
    }
  }, [selectedArticle]);

  const openModal = (message: string) => {
    setSuccessMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleShowModal = (infoMessage: string) => {
    openModal(infoMessage);
    setShowModal(true);
  };

  const fillForm = () => {
    if (selectedArticle) {
      setTitle(selectedArticle.title);
      setAuthor(selectedArticle.author);
      setDescription(selectedArticle.description);
      setImage(selectedArticle.image);
      setSelectedFile(selectedArticle.image);
    }
  };

  const isFormNotValid =
    title === "" || author === "" || description === "" || selectedFile === "";

  let disabled = true;

  if (isFormNotValid) {
    disabled = true;
  } else {
    disabled = false;
  }

  const createArticle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormNotValid) {
      return;
    }

    if (selectedArticle) {
      const updatedArticle: Article = {
        id: selectedArticle.id,
        isPinned: selectedArticle.isPinned,
        title,
        author,
        description,
        image,
      };

      dispatch(articleActions.updateArticleAsync(updatedArticle));
      handleShowModal("You have edited article, let's go to articles list.");
      return;
    }

    const newRoute: ArticleRequest = {
      title,
      author,
      description,
      image,
    };

    dispatch(articleActions.createArticle(newRoute));
    handleShowModal("You have added new article, let's go to articles list.");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.type.includes("image/")) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      <nav
        className="navbar py-2 navbarFlex"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-item">
          {!selectedArticle ? (
            <h4 className="title">Add an article</h4>
          ) : (
            <h4 className="title">Edit acticle</h4>
          )}
        </div>
      </nav>

      <form onSubmit={createArticle}>
        <div className="field is-grouped">
          <div className="control is-expanded">
            <TextField
              name="title"
              label="Title"
              value={title}
              onChange={setTitle}
              required
            />
          </div>

          <div className="control is-expanded">
            <TextField
              name="author"
              label="Author"
              value={author}
              onChange={setAuthor}
              required
            />
          </div>
        </div>

        <div className="field">
          <div className="control is-expanded">
            <div className="file">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Choose a file…</span>
                </span>
                {!selectedFile ? (
                  <span className="file-name">No file uploaded</span>
                ) : (
                  <span className="file-name">{"File loaded"}</span>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="is-fullwidth control">
            <textarea
              name="description"
              value={description}
              className="textarea"
              placeholder="type a description"
              onChange={({ target }) => {
                setDescription(target.value);
              }}
            />
          </div>
        </div>

        <div className="field">
          {selectedArticle ? (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-dark"
              disabled={disabled}
            >
              Edit
            </button>
          ) : (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-dark"
              disabled={disabled}
            >
              Add
            </button>
          )}
        </div>
      </form>

      {showModal &&
        ReactDOM.createPortal(
          <Modal message={successMessage} />,
          document.getElementById("modal-root") as Element
        )}
    </>
  );
};
