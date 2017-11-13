"use babel";

import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import { createLogger } from "redux-logger";

export default serializedState => {
  const isInDevMode = atom.inDevMode();
  const sagaMiddleware = createSagaMiddleware();
  const middlewareEnhacer = applyMiddleware(
    sagaMiddleware,
    createLogger({
      predicate: () => isInDevMode
    })
  );

  const store = serializedState
    ? createStore(reducer, serializedState, middlewareEnhacer)
    : createStore(reducer, middlewareEnhacer);
  sagaMiddleware.run(rootSaga);
  return store;
};
