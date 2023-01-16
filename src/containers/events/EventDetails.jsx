import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppLoader from "../../components/shared/AppLoader";
import EventsPageContainer from "../../components/shared/EventsPageContainer";
import actions from "../../config/actions";
import config from "../../../env.json";
import Image2 from "../../assets/image_2.png";
import AppComponentError from "../../components/shared/AppComponentError";
import { Button, Carousel, Image, notification } from "antd";
import TicketSvg from "../../assets/ticket.svg";
import { isEmpty } from "lodash";
import { AiOutlineCalendar, AiOutlineHeart } from "react-icons/ai";
const { eventActions, bookingActions } = actions;

const EventDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addBookingLoading } = useSelector((state) => state.booking);
  const { authUserSuccess } = useSelector((state) => state.auth);

  const {
    eventDetailsError,
    eventDetailsSuccess: data,
    eventDetailsLoading,
  } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(eventActions.getEventDetails({ id: params.id }));
  }, []);

  const bookTicket = (id) => {
    if (isEmpty(authUserSuccess)) {
      navigate("/auth");
      notification.info({
        message: "Please login to buy a ticket for the event",
      });
    } else {
      dispatch(bookingActions.addBooking({ event_id: data.id, ticket_id: id }));
    }
  };
  return (
    <EventsPageContainer>
      <AppLoader loading={eventDetailsLoading}>
        <AppComponentError error={eventDetailsError}>
          <div className="w-100 d-lg-flex">
            <div className="w-50 px-2 w-sm-100">
              <Carousel autoplay>
                {data?.event_images?.map((image) => {
                  return (
                    <div
                      key={image?.id}
                      className="event-image-details w-100 d-flex justify-content-center"
                    >
                      <Image
                        className="rounded-4 w-100"
                        fallback={Image2}
                        height={500}
                        src={`${config.IMAGE_BASE_URL}/${image?.file_path}`}
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div className="w-50 mt-md-3 p-2 w-sm-100">
              <h1 className="fw-bold">{data?.title}</h1>
              <div className="event-card-top my-4 d-flex">
                <div className="d-flex w-50 justify-content-left">
                  <Button className="" shape="round">
                    {data?.category}
                  </Button>
                  <Button type="primary" className="mx-2" shape="round">
                    {data?.location}
                  </Button>
                </div>
                <h4 className="w-50 d-flex justify-content-end">
                  <AiOutlineHeart className="text-right" />
                </h4>
              </div>
              <p>{data?.description}</p>
              <p className="fw-bold">
                <AiOutlineCalendar />
                {` ${new Date(data?.start_date).toDateString()} - ${new Date(
                  data?.end_date
                ).toDateString()}`}
              </p>
              <h5 className="fw-bold">Tickets</h5>
              <div className="d-flex text-card-container flex-wrap">
                {data?.tickets?.map((ticket) => {
                  return (
                    <div
                      key={ticket.id}
                      className="ticket-card w-sm-100 border p-2 d-flex  rounded-4"
                    >
                      <div className="w-50">
                        <Image
                          src={TicketSvg}
                          height={150}
                          width={100}
                          preview={false}
                        />
                      </div>
                      <div className="w-50">
                        <p className="mx-1 my-0 text-left">UGX</p>
                        <h2 className="fw-bold m-0 mb-2 ">{ticket.price}</h2>
                        <h5 className="mx-1 mb-2 text-secondary ">
                          {ticket.name}
                        </h5>
                        <Button
                          loading={addBookingLoading}
                          onClick={() => bookTicket(ticket.id)}
                          className="bg-light mx-1 mt-2"
                          size="large"
                          shape="round"
                        >
                          Buy
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AppComponentError>
      </AppLoader>
    </EventsPageContainer>
  );
};

export default EventDetails;
