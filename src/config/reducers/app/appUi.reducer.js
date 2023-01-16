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

    default:
      return state;
  }
};
