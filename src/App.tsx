import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { ArticlesList } from "./components/ArticlesList/ArticlesList";
import { NewArticleForm } from "./components/NewArticleForm/NewArticleForm";
import { NewsFromAPIList } from "./components/NewsFromAPIList";

function App() {
  return (
    <div className="">
      <nav className="navbar px-3 is-black is-flex is-justify-content-space-between">
        <div className="navbar-brand">
          <a
            className="navbar-item"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
          >
            <p className="logo">VRB-Tech</p>
          </a>
        </div>


        <div className="navbar-end is-flex">
          <div className="navbar-item">
              <p className="control">
                <Link to="/" className="is-align-items-stretch button is-light">
                  List of articles
                </Link>
              </p>
            </div>
            <div className="navbar-item">
              <p className="control">
                <Link to="add" className="is-align-items-stretch button is-light">
                  Add new Article
                </Link>
              </p>
            </div>
          <div className="navbar-item">
            <p className="control">
              <Link
                to="request"
                className="is-align-items-stretch button is-light"
              >
                Let's do request
              </Link>
            </p>
          </div>
        </div>
      </nav>

      <main className="section main">
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/add" element={<NewArticleForm />} />
          <Route path="/request" element={<NewsFromAPIList />} />
          <Route path="*" element={<p>Page not found</p>} />
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
