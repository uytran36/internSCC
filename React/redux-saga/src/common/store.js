import { compose, applyMiddleware, createStore } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(sagaMiddleware, thunk))
);

sagaMiddleware.run(rootSaga);
