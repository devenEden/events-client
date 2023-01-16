import { Button, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppContainer from "../../components/shared/AppContainer";
import AppLoader from "../../components/shared/AppLoader";
import actions from "../../config/actions";
import { setLocalStorageItem } from "../../config/services/storage.service";
const { eventActions } = actions;

const MyEvents = () => {
  const { myEventsSuccess, myEventsLoading } = useSelector(
    (state) => state.events
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(eventActions.getMyEvents());
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (text) => <span>{new Date(text).toDateString()}</span>,
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              navigate(`/manage-events/${record.id}`);
              setLocalStorageItem("event", record);
              dispatch(eventActions.getEventDetails({ id: record.id }));
            }}
            type="primary"
          >
            Edit
          </Button>
          <Button danger type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <AppContainer title={"My Events"}>
      <AppLoader loading={myEventsLoading}>
        <Button
          onClick={() => navigate(`/add-event`)}
          type="primary"
          className="my-2"
        >
          Add Event
        </Button>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={myEventsSuccess.events}
        />
      </AppLoader>
    </AppContainer>
  );
};

export default MyEvents;
