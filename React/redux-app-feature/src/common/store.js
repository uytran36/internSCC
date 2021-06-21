import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { compose, applyMiddleware, createStore } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
