const setToken = (tokenObj) =>
  localStorage.setItem("access_token", tokenObj.token);
const getAccessToken = () => localStorage.getItem("access_token");
const clearToken = () => localStorage.removeItem("access_token");
const setLocalStorageItem = (name, item) => localStorage.setItem(name, item);
const getLocalStorageItem = (name) => localStorage.getItem(name);
const removeLocalStorageItem = (name) => localStorage.removeItem(name);

export {
  setToken,
  getAccessToken,
  clearToken,
  setLocalStorageItem,
  removeLocalStorageItem,
  getLocalStorageItem,
};
