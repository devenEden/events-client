import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import logger from "redux-logger";
import env from "../../../env.json";
import createSagaMiddleware from "@redux-saga/core";

const store = () => {
  const sagaMiddleware = createSagaMiddleware();
  if (env.NODE_ENV === "production") {
    return {
      ...configureStore({
        reducer: rootReducer,
        middleware: [sagaMiddleware],
        devTools: false,
        runSaga: sagaMiddleware.run,
      }),
    };
  }
  return {
    ...configureStore({
      reducer: rootReducer,
      middleware: [sagaMiddleware, logger],
      devTools: true,
    }),
    runSaga: sagaMiddleware.run,
  };
};

export default store;
