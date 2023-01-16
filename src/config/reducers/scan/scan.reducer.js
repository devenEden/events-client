import initialState from "../../initialState";
import actions from "../../actions";
const { scanActions } = actions;

export default (state = initialState.scan, actions) => {
  switch (actions.type) {
    case scanActions.ADD_SCAN_REQUEST:
      return { ...state, addScanLoading: true, addScanError: {} };
    case scanActions.ADD_SCAN_SUCCESS:
      return {
        ...state,
        addScanLoading: false,
        addScanSuccess: actions.data,
      };
    case scanActions.ADD_SCAN_ERROR:
      return {
        ...state,
        addScanLoading: false,
      };
    case scanActions.ON_SCAN_REQUEST:
      return { ...state, onScanLoading: true, onScanError: {} };
    case scanActions.ON_SCAN_SUCCESS:
      return {
        ...state,
        onScanLoading: false,
        onScanSuccess: actions.data,
      };
    case scanActions.ON_SCAN_ERROR:
      return {
        ...state,
        onScanLoading: false,
        onScanError: actions.error,
      };

    default:
      return state;
  }
};
