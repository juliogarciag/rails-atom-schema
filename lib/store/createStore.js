"use babel";

import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";

export default serializedState => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewareEnhacer = applyMiddleware(sagaMiddleware);

  const store = serializedState
    ? createStore(reducer, serializedState, middlewareEnhacer)
    : createStore(reducer, middlewareEnhacer);
  sagaMiddleware.run(rootSaga);
  return store;
};
