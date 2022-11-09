import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports';
import App from './App';
import './index.css';
import { store } from './store/store';
import { v4 as uuidv4 } from "uuid";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


