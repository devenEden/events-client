import { Calendar, Form, Select } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../../components/events/EventCard";
import AppContainer from "../../components/shared/AppContainer";
import AppLoader from "../../components/shared/AppLoader";
import actions from "../../config/actions";
const { eventActions } = actions;

const Events = () => {
  const dispatch = useDispatch();
  const { eventsSuccess, eventsLoading } = useSelector((state) => state.events);

  useEffect(() => {
    if (isEmpty(eventsSuccess)) dispatch(eventActions.getEvents());
  }, [eventsSuccess]);

  return (
    <AppContainer title={`Events (${eventsSuccess?.data?.events?.length})`}>
      <div className="mt-3">
        <div className="w-50">
          <Form layout="horizontal">
            <Form.Item label="Category: " name={"categories"}>
              <Select className="w-25" />
            </Form.Item>
          </Form>
        </div>
        <div className="p3 w-100 border-bottom " />
        <AppLoader loading={eventsLoading}>
          <div className="w-100 d-flex align-items-start">
            <div className="d-flex flex-wrap py-2 w-75">
              {eventsSuccess?.data?.events?.map((event) => (
                <EventCard
                  address={event.address}
                  title={event.title}
                  category={event.category}
                  summary={event.summary}
                  key={event.id}
                  id={event.id}
                />
              ))}
            </div>
            <div className="w-25 mt-2">
              <Calendar fullscreen={false} />
            </div>
          </div>
        </AppLoader>
      </div>
    </AppContainer>
  );
};

export default Events;
