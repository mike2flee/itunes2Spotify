import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import App from "./App";
import { Router, hasHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from "./configureStore";
import routes from "./routes";
import * as serviceWorker from "./serviceWorker";

const store = configureStore();
const history = syncHistoryWithStore(hasHistory, store);
ReactDOM.render(
  <Provider store={store}>
    <div>
      <div>
        <Router history={history} routes={routes} />
      </div>
    </div>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
