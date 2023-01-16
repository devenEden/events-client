import { Button, Modal, QRCode, Space, Table } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppLoader from "../../components/shared/AppLoader";
import EventsPageContainer from "../../components/shared/EventsPageContainer";
import actions from "../../config/actions";
import { getAccessToken } from "../../config/services/storage.service";
import config from "../../../env.json";
const { bookingActions, eventActions } = actions;

const MyBookings = () => {
  const { bookingSuccess, bookingLoading } = useSelector(
    (state) => state.booking
  );
  const { authUserSuccess } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);
  const [booking, setBooking] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getAccessToken();

  useEffect(() => {
    if (isEmpty(bookingSuccess) && token) {
      dispatch(bookingActions.getBooking());
      dispatch(eventActions.getEvents());
    }

    if (!token) {
      navigate("/auth/login");
    }
  }, [bookingSuccess, token]);

  const columns = [
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      render: (text, record) => record?.event?.title,
    },
    {
      title: "Ticket",
      dataIndex: "ticket",
      key: "ticket",
      render: (text, record) => record?.ticket?.name,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setBooking(
                `u-${authUserSuccess?.user?.id}_t-${record?.ticket?.id}_tb-${record.id}_e-${record?.event?.id}`
              );
              setVisible(true);
            }}
            type="primary"
          >
            Get QR Code
          </Button>
          <Button danger type="primary">
            Cancel
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <EventsPageContainer title={"My Tickets"}>
      <h1 className="fw-bold">My Tickets</h1>
      <AppLoader loading={bookingLoading}>
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={bookingSuccess?.ticketBookings}
        />
        <Modal open={visible} footer={null} onCancel={() => setVisible(false)}>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h3>Event QR Code</h3>
            <QRCode value={`${config.ClIENT_URL}/scan/${booking}`} />
          </div>
        </Modal>
      </AppLoader>
    </EventsPageContainer>
  );
};

export default MyBookings;
