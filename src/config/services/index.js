import storageService from "./storage.service";
import httpService from "./http.service";

export default {
  ...storageService,
  httpService,
};
