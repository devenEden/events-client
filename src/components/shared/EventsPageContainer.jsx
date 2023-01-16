import React from "react";
import PropTypes from "prop-types";
import EventHeader from "../events/EventHeader";

const EventsPageContainer = ({ children }) => {
  return (
    <div>
      <EventHeader />
      <div className="mt-5 pt-5 px-3">{children}</div>
    </div>
  );
};

EventsPageContainer.propTypes = {
  children: PropTypes.node,
};

export default EventsPageContainer;
