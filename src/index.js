import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "./configureStore";
import * as serviceWorker from "./serviceWorker";

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
