import initialState from "../../initialState";
import actions from "../../actions";
const { appUiActions } = actions;

export default (state = initialState.appUi, actions) => {
  switch (actions.type) {
    case appUiActions.TOGGLE_APP_DRAWER:
      return {
        ...state,
        appDrawer: actions.data,
      };
    case appUiActions.UPDATE_EVENTS_MODAL:
      return {
        ...state,
        updateEventsModal: actions.data,
      };
    case appUiActions.UPLOAD_EVENT_IMAGES_MODAL:
      return {
        ...state,
        uploadEventImagesModal: actions.data,
      };

    default:
      return state;
  }
};
