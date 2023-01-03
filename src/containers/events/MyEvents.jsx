import { Button, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppContainer from "../../components/shared/AppContainer";
import AppLoader from "../../components/shared/AppLoader";
import actions from "../../config/actions";
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
      render: () => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
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
          onClick={() => navigate("/manage-events")}
          type="primary"
          className="my-2"
        >
          Add Event
        </Button>
        <Table columns={columns} dataSource={myEventsSuccess.data} />
      </AppLoader>
    </AppContainer>
  );
};

export default MyEvents;
