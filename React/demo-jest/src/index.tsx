import React from "react";
import ReactDOM from "react-dom";
import App from "./common/App";
import { store } from "./common/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
