const appUi = {
  TOGGLE_APP_DRAWER: "TOGGLE_APP_DRAWER",
  UPDATE_EVENTS_MODAL: "UPDATE_EVENTS_MODAL",
  UPLOAD_EVENT_IMAGES_MODAL: "UPLOAD_EVENT_IMAGES_MODAL",

  toggleAppDrawer: (data) => ({
    type: appUi.TOGGLE_APP_DRAWER,
    data,
  }),
  toggleUpdateEventsModal: (data) => ({
    type: appUi.UPDATE_EVENTS_MODAL,
    data,
  }),

  toggleUploadEventImagesModal: (data) => ({
    type: appUi.UPLOAD_EVENT_IMAGES_MODAL,
    data,
  }),
};

export default appUi;
