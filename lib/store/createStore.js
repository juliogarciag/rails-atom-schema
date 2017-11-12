"use babel";

import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import { createLogger } from "redux-logger";

export default serializedState => {
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger();
  const middlewareEnhacer = applyMiddleware(sagaMiddleware, loggerMiddleware);

  const store = serializedState
    ? createStore(reducer, serializedState, middlewareEnhacer)
    : createStore(reducer, middlewareEnhacer);
  sagaMiddleware.run(rootSaga);
  return store;
};
