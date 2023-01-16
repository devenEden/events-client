import axios from "axios";
import actions from "../actions";
import { isEmpty } from "lodash";
import env from "../../../env.json";
import { clearToken, getAccessToken } from "./storage.service";
const { serverActions } = actions;

const httpService = {
  setUpInterceptors: (store) => {
    const { dispatch } = store;
    axios.interceptors.request.use(
      (config) => {
        const localConfig = config;
        // Do something before request is sent
        const token = getAccessToken();
        if (token) localConfig.headers.Authorization = `Bearer ${token}`;

        if (!localConfig.headers["Content-type"])
          localConfig.headers["Content-type"] = "application/json";

        localConfig.headers.Accept = "application/json";
        localConfig.timeout =
          localConfig.timeout === 0 ? 60000 : localConfig.timeout;
        localConfig.baseURL = env.REACT_APP_API_BASE_URL;
        dispatch(serverActions.serverRequest());
        return localConfig;
      },
      (error) => Promise.reject(error)
    );
    axios.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        const { config, data } = response;

        if (config && config.method !== "get") {
          if (data) {
            dispatch(serverActions.serverSuccess(data));
          }
        }
        // Return entire response if response type blob
        if (config && config.responseType === "blob") return response;
        return data;
      },
      (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        let { response } = error;

        if (!isEmpty(response)) {
          if (response.status === 401) {
            clearToken();
            response = {
              data: { server: { message: "Session Expired!" } },
            };
          } else if (response.status === 404) {
            response = {
              data: { server: { message: "Resource not found" } },
            };
          }
        } else {
          response = {
            data: {
              server: {
                message:
                  "Connection Failed, Please check your Internet connection and try again.",
              },
            },
          };
        }
        dispatch(serverActions.serverError(response));
        return Promise.reject(response);
      }
    );
  },
};

export default httpService;
