import actions from "../../actions";
import initialState from "../../initialState";
const { serverActions } = actions;

const server = (state = initialState.server, actions) => {
  switch (actions.type) {
    case serverActions.SERVER_REQUEST:
      return {
        ...state,
        serverSuccess: {},
        serverError: {},
      };

    case serverActions.SERVER_ERROR:
      return {
        ...state,
        serverSuccess: {},
        serverError: actions.error.data,
      };

    case serverActions.SERVER_SUCCESS:
      return {
        ...state,
        serverSuccess: actions.data,
        serverError: {},
      };

    default:
      return state;
  }
};

export default server;
