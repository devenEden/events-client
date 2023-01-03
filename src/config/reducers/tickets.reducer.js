import actions from "../actions";
import initialState from "../initialState";
const { ticketActions } = actions;

export default (state = initialState.tickets, actions) => {
  switch (actions.type) {
    case ticketActions.GET_TICKETS_REQUEST:
      return {
        ...state,
        ticketsLoading: true,
        ticketsError: {},
      };
    case ticketActions.GET_TICKETS_SUCCESS:
      return {
        ...state,
        ticketsLoading: false,
        ticketsSuccess: actions.data,
      };
    case ticketActions.GET_TICKETS_ERROR:
      return {
        ...state,
        ticketsLoading: false,
        ticketsError: actions.error,
      };
    case ticketActions.ADD_TICKETS_REQUEST:
      return {
        ...state,
        addTicketsLoading: true,
        addTicketsError: {},
      };
    case ticketActions.ADD_TICKETS_SUCCESS:
      return {
        ...state,
        addTicketsLoading: false,
        addTicketsSuccess: actions.data,
      };
    case ticketActions.ADD_TICKETS_ERROR:
      return {
        ...state,
        addTicketsLoading: false,
        addTicketsError: actions.error,
      };
    case ticketActions.UPDATE_TICKETS_REQUEST:
      return {
        ...state,
        updateTicketsLoading: true,
        updateTicketsError: {},
      };
    case ticketActions.UPDATE_TICKETS_SUCCESS:
      return {
        ...state,
        updateTicketsLoading: false,
        updateTicketsSuccess: actions.data,
      };
    case ticketActions.UPDATE_TICKETS_ERROR:
      return {
        ...state,
        updateTicketsLoading: false,
        updateTicketsError: actions.error,
      };
    case ticketActions.UPDATE_TICKET_DATA:
      return {
        ...state,
        updateTicketsData: actions.data,
      };
    case ticketActions.DELETE_TICKETS_REQUEST:
      return {
        ...state,
        deleteTicketsLoading: true,
        deleteTicketsError: {},
      };
    case ticketActions.DELETE_TICKETS_SUCCESS:
      return {
        ...state,
        deleteTicketsLoading: false,
        deleteTicketsSuccess: actions.data,
      };
    case ticketActions.DELETE_TICKETS_ERROR:
      return {
        ...state,
        deleteTicketsLoading: false,
        deleteTicketsError: actions.error,
      };
    case ticketActions.GET_TICKET_DETAILS_REQUEST:
      return {
        ...state,
        ticketDetailsLoading: true,
        ticketDetailsError: {},
      };
    case ticketActions.GET_TICKET_DETAILS_SUCCESS:
      return {
        ...state,
        ticketDetailsLoading: false,
        ticketDetailsSuccess: actions.data,
      };
    case ticketActions.GET_TICKET_DETAILS_ERROR:
      return {
        ...state,
        ticketDetailsLoading: false,
        ticketDetailsError: actions.error,
      };

    default:
      return state;
  }
};
