import { Button, Space, Table, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppContainer from "../../components/shared/AppContainer";
import AppLoader from "../../components/shared/AppLoader";
import actions from "../../config/actions";
// import { setLocalStorageItem } from "../../config/services/storage.service";
import UpdateEvents from "./UpdateEvents";
import UploadEventImages from "./UploadEventImages";
const { eventActions, appUiActions } = actions;

const MyEvents = () => {
  const {
    myEventsSuccess,
    myEventsLoading,
    deleteEventsLoading,
    deleteEventsSuccess,
  } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(eventActions.getMyEvents());
  }, []);

  // if delete success then get all events again
  useEffect(() => {
    if (deleteEventsSuccess) {
      dispatch(eventActions.getMyEvents());
    }
  }, [deleteEventsSuccess]);

  const deleteEvent = () => {
    dispatch(eventActions.deleteEvents(deleteId));
  };

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
              // navigate(`/manage-events/${record.id}`);
              // setLocalStorageItem("event", record);
              dispatch(eventActions.getEventDetails({ id: record.id }));
              dispatch(appUiActions.toggleUpdateEventsModal(true));
            }}
            type="primary"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this event?"
            onConfirm={() => {
              deleteEvent();
            }}
            okText="Yes"
            cancelText="No"
          >
            {/* make the loading only for the row being deleted */}
            <Button
              danger
              type="primary"
              loading={deleteEventsLoading && deleteId === record.id}
              onClick={() => {
                setDeleteId(record.id);
              }}
            >
              Delete
            </Button>
          </Popconfirm>
          {/* Button to open upload event images modal */}
          <Button
            onClick={() => {
              dispatch(eventActions.getEventDetails({ id: record.id }));
              dispatch(appUiActions.toggleUploadEventImagesModal(true));
            }}
          >
            Upload Images
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <AppContainer title={"My Events"}>
      <UpdateEvents />
      <UploadEventImages />
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
