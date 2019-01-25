import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import rootReducer from "./reducers";

const logger = createLogger({
  collapsed: true
});

export default createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(logger))
);
