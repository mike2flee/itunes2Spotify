import { createStore, applyMiddleware, compose } from "redux";
///import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { createLogger } from "redux-logger";
//import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./rootReducer";
import logger from "redux-logger";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Add middle-ware into the store as we create it
const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(promise, createLogger({ collapsed: true }), logger)
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}
