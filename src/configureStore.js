import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./rootReducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Add middle-ware into the store as we create it
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk))(
  createStore
);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}
