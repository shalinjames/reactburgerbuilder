import {
  burgerReducer,
  purchaseReducer,
  authReducer
} from "./reducers/reducer";

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

const rootReducers = combineReducers({
  burger: burgerReducer,
  purchase: purchaseReducer,
  auth: authReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);
