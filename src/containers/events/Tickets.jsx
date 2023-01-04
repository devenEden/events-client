import { Form, Select, Card, Avatar, Table, Button, notification } from "antd";
import React, { useEffect } from "react";
import AppContainer from "../../components/shared/AppContainer";
import EventCard from "../../components/events/EventCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../config/actions";
import usePrevious from "../../components/hooks/usePrevious";
import { isEmpty } from "lodash";
const { eventActions, bookingActions } = actions;

const Tickets = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { eventDetailsSuccess } = useSelector((state) => state.events);
  const { addBookingSuccess, addBookingLoading } = useSelector(
    (state) => state.booking
  );
  const prevState = usePrevious({ addBookingSuccess });

  const activitesColumns = [
    {
      title: "name",
      dataIndex: "activity",
      key: "name",
    },
    {
      title: "Start",
      dataIndex: "start_time",
      key: "price",
      render: (record) => new Date(record).toDateString(),
    },
    {
      title: "End",
      dataIndex: "end_time",
      key: "type",
      render: (record) => new Date(record).toDateString(),
    },
  ];

  const onFinish = (values) => {
    values.event = params.id;
    dispatch(bookingActions.addBooking(values));
  };

  useEffect(() => {
    dispatch(eventActions.getEventDetails({ id: params.id }));
  }, []);

  useEffect(() => {
    if (
      !isEmpty(prevState) &&
      !isEmpty(addBookingSuccess) &&
      prevState.addBookingSuccess !== addBookingSuccess
    ) {
      notification.success({
        message: "Notification",
        description: "Booking added successfully",
      });
    }
  }, [prevState, addBookingSuccess]);
  return (
    <AppContainer title={"Tickets"}>
      <div className="mt-3">
        <div className="p3 w-100 border-bottom " />
        <div className="w-100 d-flex align-items-start">
          <div className="d-flex flex-wrap py-2 w-75">
            <EventCard
              address={eventDetailsSuccess.data?.event?.address}
              title={eventDetailsSuccess.data?.event?.title}
              category={eventDetailsSuccess.data?.event?.category}
              summary={eventDetailsSuccess.data?.event?.summary}
              id={eventDetailsSuccess.data?.event?.id?.toString()}
            />
            <div className="bg-white m-1 py-3 p-2 w-100 rounded-2">
              <h3 className="fw-normal">Whats On ? </h3>
              <p className="ft-1 text-secondary">
                {eventDetailsSuccess.data?.event?.description}
              </p>
              <h5 className="fw-normal">Activties</h5>
              <Table
                rowKey={(record) => record.id}
                columns={activitesColumns}
                dataSource={eventDetailsSuccess?.data?.event_activities}
                pagination={false}
              />
            </div>
          </div>
          <div className="w-25 mt-2">
            <Card bordered={false} style={{ width: 300 }}>
              <div>
                <Form onFinish={onFinish} layout="vertical">
                  <Form.Item required label="Ticket: " name={"ticket"}>
                    <Select className="w-100">
                      {eventDetailsSuccess?.data?.tickets?.map((ticket) => (
                        <Select.Option key={ticket.id} value={ticket.id}>
                          {`${ticket.name} - UGX ${ticket.price}`}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      loading={addBookingLoading}
                      htmlType="submit"
                      type="primary"
                      className="w-100"
                    >
                      Order
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Card>
            <div className="mt-3">
              <Card bordered={false} style={{ width: 300 }}>
                <div>
                  <h5 className="fw-normal">3 Attendees</h5>
                  <div className="d-flex flex-column">
                    <div className="d-flex flex-row mt-3">
                      <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        size={64}
                      />
                      <div className="d-flex flex-column m-2">
                        <h6 className="fw-normal">Jovia</h6>
                        <p className="fw-normal">
                          <small>1 Ticket</small>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex-row mt-3">
                      <Avatar
                        src="https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556785.jpg"
                        size={64}
                      />
                      <div className="d-flex flex-column m-2">
                        <h6 className="fw-normal">Allan</h6>
                        <p className="fw-normal">
                          <small>1 Ticket</small>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex-row mt-3">
                      <Avatar
                        src="https://img.freepik.com/free-photo/headshot-handsome-young-afro-american-male-looking-with-broad-friendly-smile-enjoying-good-day-leisure-time-indoors-black-man-feeling-happy-carefree-while-relaxing-home_273609-433.jpg"
                        size={64}
                      />
                      <div className="d-flex flex-column m-2">
                        <h6 className="fw-normal">Kelvin</h6>
                        <p className="fw-normal">
                          <small>1 Ticket</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

export default Tickets;
