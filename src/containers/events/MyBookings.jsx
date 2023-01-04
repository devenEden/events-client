import { Button, Modal, QRCode, Space, Table } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppContainer from "../../components/shared/AppContainer";
import AppLoader from "../../components/shared/AppLoader";
import actions from "../../config/actions";
const { bookingActions, eventActions } = actions;

const MyBookings = () => {
  const { bookingSuccess, bookingLoading } = useSelector(
    (state) => state.booking
  );
  const [visible, setVisible] = useState(false);
  const [booking, setBooking] = useState({});
  const { eventsSuccess } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(bookingSuccess)) {
      dispatch(bookingActions.getBooking());
      dispatch(eventActions.getEvents());
    }
  }, [bookingSuccess]);

  const columns = [
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      render: (text) => {
        const event = eventsSuccess?.data?.events?.find(
          (event) => event.id === text
        );

        return event.title;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setBooking(record);
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
    <AppContainer title={"My Tickets"}>
      <AppLoader loading={bookingLoading}>
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={bookingSuccess?.data}
        />
        <Modal open={visible} footer={null} onCancel={() => setVisible(false)}>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h3>Event QR Code</h3>
            <QRCode
              value={`http://127.0.0.1:9090/scan-qr/${booking?.qr_code_value}`}
            />
          </div>
        </Modal>
      </AppLoader>
    </AppContainer>
  );
};

export default MyBookings;
