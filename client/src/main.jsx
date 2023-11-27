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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>,
)
