import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import nextPage from "./nextPage";
import App from "./App";
import configureStore from "./configureStore";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}></Route>
      <Route path="/playListCreation" component={nextPage}></Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
