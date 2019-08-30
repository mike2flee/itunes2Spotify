import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./rootReducer";

// Add middle-ware into the store as we create it
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}
