import { Button, Image } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventsPageContainer from "../../components/shared/EventsPageContainer";
import actions from "../../config/actions";
import EventCard from "../../components/events/EventCard";
import AppLoader from "../../components/shared/AppLoader";
import NoEvents from "../../assets/NoEvents.png";
const { eventActions } = actions;

const Events = () => {
  const dispatch = useDispatch();
  const { eventsSuccess, eventsLoading } = useSelector((state) => state.events);

  useEffect(() => {
    if (isEmpty(eventsSuccess)) dispatch(eventActions.getEvents());
  }, [eventsSuccess]);

  return (
    <EventsPageContainer>
      <div className="my-3">
        <h1 data-aos="fade-in" className="text-center fw-bold display-2">
          Browse Events
        </h1>
        <p data-aos="fade-in" className="text-center my-3">
          Welcome to events app! Discover exciting events happening near you,
          from concerts and festivals to workshops
        </p>
      </div>
      <div
        data-aos="fade-up"
        className="buttons d-flex justify-content-center flex-wrap"
      >
        <Button className="mx-2" type="primary" shape="round">
          All
        </Button>
        <Button className="mx-2" shape="round">
          Parties
        </Button>
        <Button className="mx-2" shape="round">
          Social
        </Button>
      </div>
      <AppLoader loading={eventsLoading}>
        <div className="all-events-container p-2 my-4 mx-5 d-flex flex-wrap justify-content-center ">
          {isEmpty(eventsSuccess?.events) && (
            <>
              <h3>No Events Avalilable</h3>
              <Image preview={false} src={NoEvents} />
            </>
          )}
          {eventsSuccess?.events?.map((event) => {
            return (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                category={event.category}
                summary={event.summary}
                images={event.event_images}
              />
            );
          })}
        </div>
      </AppLoader>
    </EventsPageContainer>
  );
};

export default Events;
