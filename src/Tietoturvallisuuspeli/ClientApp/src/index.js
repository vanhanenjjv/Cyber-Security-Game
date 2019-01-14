import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import 'typeface-roboto';
import rootReducer from './reducers';
import axiosMiddleware from 'redux-axios-middleware';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

const client = axios.create({
  baseURL: `${process.env.PUBLIC_URL}/api`,
  responseType: 'json'
});

const store = createStore(rootReducer, applyMiddleware(
  axiosMiddleware(client)
));

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, rootElement);

serviceWorker.unregister();
