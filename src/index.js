import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import Reducer from './Store/Reducer'


const middleWare = [thunk];
const initialState = {
  nav: [{ id: 1, label: 'Mobile Phones' },
  { id: 2, label: 'Cars' },
  { id: 3, label: 'Motorcycles' },
  { id: 4, label: 'Houses' },
  { id: 5, label: 'TV-Video-Audio' },
  { id: 6, label: 'Tablets' },
  { id: 7, label: 'Land & Plots' }],
  data: [],
  images: [],
  isDataLoading: true,
  detailAddViewData: [],
  detailAddImageData: []
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  Reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
