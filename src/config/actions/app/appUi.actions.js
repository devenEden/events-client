const appUi = {
  TOGGLE_APP_DRAWER: "TOGGLE_APP_DRAWER",

  toggleAppDrawer: (data) => ({
    type: appUi.TOGGLE_APP_DRAWER,
    data,
  }),
};

export default appUi;
