import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./config/store";
import httpService from "./config/services/http.service";
import { ConfigProvider, theme } from "antd";
import rootSaga from "./config/sagas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const store = configureStore();
store.runSaga(rootSaga);
httpService.setUpInterceptors(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);
