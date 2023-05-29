import ReactDOM from 'react-dom/client';
import './index.css';
import 'bulma/css/bulma.min.css';
import App from "./App";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <Provider store={store}>
  <BrowserRouter>
      <App />
  </BrowserRouter>
  </Provider>
);

reportWebVitals();