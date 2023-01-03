import actions from "../../actions";
import initialState from "../../initialState";
const { eventActions } = actions;

export default (state = initialState.events, actions) => {
  switch (actions.type) {
    case eventActions.GET_EVENTS_REQUEST:
      return {
        ...state,
        eventsLoading: true,
        eventsError: {},
      };
    case eventActions.GET_EVENTS_SUCCESS:
      return {
        ...state,
        eventsLoading: false,
        eventsSuccess: actions.data,
      };
    case eventActions.GET_EVENTS_ERROR:
      return {
        ...state,
        eventsLoading: false,
        eventsError: actions.error,
      };
    case eventActions.GET_EVENT_DETAILS_REQUEST:
      return {
        ...state,
        eventDetailsLoading: true,
        eventDetailsError: {},
      };
    case eventActions.GET_EVENT_DETAILS_SUCCESS:
      return {
        ...state,
        eventDetailsLoading: false,
        eventDetailsSuccess: actions.data,
      };
    case eventActions.GET_EVENT_DETAILS_ERROR:
      return {
        ...state,
        eventDetailsLoading: false,
        eventDetailsError: actions.error,
      };
    case eventActions.ADD_EVENTS_REQUEST:
      return {
        ...state,
        addEventsLoading: true,
        addEventsError: {},
      };
    case eventActions.ADD_EVENTS_SUCCESS:
      return {
        ...state,
        addEventsLoading: false,
        addEventsSuccess: actions.data,
      };
    case eventActions.ADD_EVENTS_ERROR:
      return {
        ...state,
        addEventsLoading: false,
        addEventsError: actions.error,
      };
    case eventActions.UPDATE_EVENT_DATA: {
      return {
        ...state,
        updateEventData: actions.data,
      };
    }
    case eventActions.UPDATE_EVENTS_REQUEST:
      return {
        ...state,
        updateEventsLoading: true,
        updateEventsError: {},
      };
    case eventActions.UPDATE_EVENTS_SUCCESS:
      return {
        ...state,
        updateEventsLoading: false,
        updateEventsSuccess: actions.data,
      };
    case eventActions.UPDATE_EVENTS_ERROR:
      return {
        ...state,
        updateEventsLoading: false,
        updateEventsError: actions.error,
      };
    case eventActions.DELETE_EVENTS_REQUEST:
      return {
        ...state,
        deleteEventsLoading: true,
        deleteEventsError: {},
      };
    case eventActions.DELETE_EVENTS_SUCCESS:
      return {
        ...state,
        deleteEventsLoading: false,
        deleteEventsSuccess: actions.data,
      };
    case eventActions.DELETE_EVENTS_ERROR:
      return {
        ...state,
        deleteEventsLoading: false,
        deleteEventsError: actions.error,
      };

    case eventActions.GET_MY_EVENTS_REQUEST:
      return {
        ...state,
        myEventsLoading: true,
        myEventsError: {},
      };
    case eventActions.GET_MY_EVENTS_SUCCESS:
      return {
        ...state,
        myEventsLoading: false,
        myEventsSuccess: actions.data,
      };
    case eventActions.GET_MY_EVENTS_ERROR:
      return {
        ...state,
        myEventsLoading: false,
        myEventsError: actions.error,
      };

    default:
      return state;
  }
};
