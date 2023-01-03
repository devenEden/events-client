import initialState from "../initialState";
import actions from "../actions";
const { bookingActions } = actions;

export default (state = initialState.tickets, actions) => {
  switch (actions.type) {
    case bookingActions.GET_BOOKING_REQUEST:
      return {
        ...state,
        bookingLoading: true,
        bookingError: {},
      };
    case bookingActions.GET_BOOKING_SUCCESS:
      return {
        ...state,
        bookingLoading: false,
        bookingSuccess: actions.data,
      };
    case bookingActions.GET_BOOKING_ERROR:
      return {
        ...state,
        bookingLoading: false,
        bookingError: actions.error,
      };
    case bookingActions.ADD_BOOKING_REQUEST:
      return {
        ...state,
        addBookingLoading: true,
        addBookingError: {},
      };
    case bookingActions.ADD_BOOKING_SUCCESS:
      return {
        ...state,
        addBookingLoading: false,
        addBookingSuccess: actions.data,
      };
    case bookingActions.ADD_BOOKING_ERROR:
      return {
        ...state,
        addBookingLoading: false,
        addBookingError: actions.error,
      };
    case bookingActions.UPDATE_BOOKING_REQUEST:
      return {
        ...state,
        updateBookingLoading: true,
        updateBookingError: {},
      };
    case bookingActions.UPDATE_BOOKING_SUCCESS:
      return {
        ...state,
        updateBookingLoading: false,
        updateBookingSuccess: actions.data,
      };
    case bookingActions.UPDATE_BOOKING_ERROR:
      return {
        ...state,
        updateBookingLoading: false,
        updateBookingError: actions.error,
      };
    case bookingActions.UPDATE_BOOKING_DATA:
      return {
        ...state,
        updateTicketsData: actions.data,
      };
    case bookingActions.DELETE_BOOKING_REQUEST:
      return {
        ...state,
        deleteBookingLoading: true,
        deleteBookingError: {},
      };
    case bookingActions.DELETE_BOOKING_SUCCESS:
      return {
        ...state,
        deleteBookingLoading: false,
        deleteBookingSuccess: actions.data,
      };
    case bookingActions.DELETE_BOOKING_ERROR:
      return {
        ...state,
        deleteBookingLoading: false,
        deleteBookingError: actions.error,
      };
    case bookingActions.GET_BOOKING_DETAILS_REQUEST:
      return {
        ...state,
        bookingDetailsLoading: true,
        bookingDetailsError: {},
      };
    case bookingActions.GET_BOOKING_DETAILS_SUCCESS:
      return {
        ...state,
        bookingDetailsLoading: false,
        bookingDetailsSuccess: actions.data,
      };
    case bookingActions.GET_BOOKING_DETAILS_ERROR:
      return {
        ...state,
        bookingDetailsLoading: false,
        bookingDetailsError: actions.error,
      };

    default:
      return state;
  }
};
