import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers";
import createSagaMiddleWare from 'redux-saga';
import watchers from "./sagas";


const saga = createSagaMiddleWare();

const middlewares = [
  saga
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}


const store = createStore(reducer,
  applyMiddleware(...middlewares)
)


saga.run(watchers);

export default store;
