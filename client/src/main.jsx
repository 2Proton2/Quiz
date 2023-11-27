import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppRouter from './routes/root';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './index.css';
import store from './store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <Provider store={store}>
          <AppRouter />
          <ToastContainer />
        </Provider>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>,
)
