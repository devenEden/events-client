import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Table,
  Tabs,
} from "antd";
import { isEmpty } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppContainer from "../../components/shared/AppContainer";
import actions from "../../config/actions";
import moment from "moment";
const { eventActions, ticketActions } = actions;
const { TabPane } = Tabs;

const ManageEvents = () => {
  const dispatch = useDispatch();
  const {
    addEventsLoading,
    addEventsSuccess,
    eventsSuccess,
    eventDetailsSuccess,
  } = useSelector((state) => state.events);

  const onFinish = (values) => {
    values.path = "/events/create/";
    dispatch(eventActions.addEvents(values));
  };
  const params = useParams();

  const fields = params?.id
    ? [
        { name: "title", value: eventDetailsSuccess?.data?.event?.title },
        { name: "category", value: eventDetailsSuccess?.data?.event?.category },
        {
          name: "description",
          value: eventDetailsSuccess?.data?.event?.description,
        },
        { name: "address", value: eventDetailsSuccess?.data?.event?.address },
        {
          name: "created_at",
          value: moment(eventDetailsSuccess?.data?.event?.created_at),
        },
        { name: "summary", value: eventDetailsSuccess?.data?.event?.summary },
      ]
    : null;

  const columns = [
    {
      title: "User",
      dataIndex: "id",
      key: "user",
      render: (text) => {
        const user = eventsSuccess.data?.users?.find(
          (item) => item.id === text
        );
        return user?.username;
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button danger type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const ticketColumns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      render: (record) => <span>{record} UGX</span>,
    },
    {
      title: "Type",
      dataIndex: "ticket_type",
      key: "type",
    },
    {
      title: "Available Quantity",
      dataIndex: "available_quantity",
      key: "available_quantity",
    },
  ];

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

  const onFinishEventOrganisers = (values) => {
    values.event = eventDetailsSuccess.data?.event?.id;
    values.path = "/events/organizers/create/";
    dispatch(ticketActions.addTickets(values));
  };

  const onFinishTicket = (values) => {
    values.event = eventDetailsSuccess.data?.event?.id;
    dispatch(ticketActions.addTickets(values));
  };

  const onFinishActivity = (values) => {
    values.event = eventDetailsSuccess.data?.event?.id;
    values.path = "/events/activities/create/";
    dispatch(eventActions.addEvents(values));
  };
  return (
    <AppContainer title={"Manage Events"}>
      <Tabs>
        <TabPane key="add-event" tab="Add Event">
          {!isEmpty(addEventsSuccess) && (
            <Alert
              type="success"
              showIcon
              message="Added Event"
              className="w-50 my-2"
            />
          )}
          <div className="d-flex">
            <div className="w-50 bg-white p-2 rounded">
              <Form fields={fields} onFinish={onFinish} layout="vertical">
                <Form.Item name={"title"} label="Title">
                  <Input />
                </Form.Item>
                <Form.Item name={"summary"} label="Summary">
                  <Input />
                </Form.Item>
                <Form.Item label="Description" name={"description"}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Category" name={"category"}>
                  <Input />
                </Form.Item>
                <Form.Item label="Date" name={"created_at"}>
                  <DatePicker className="w-100" />
                </Form.Item>
                <Form.Item label="Address" name={"address"}>
                  <Input />
                </Form.Item>
                <Button
                  loading={addEventsLoading}
                  htmlType="submit"
                  type="primary"
                >
                  Add Event
                </Button>
              </Form>
            </div>
          </div>
        </TabPane>
        <TabPane key="add-organizers" tab="Add Organizers">
          <div className="d-flex align-items-start">
            <div className="w-25 mt-1 bg-white p-2">
              {!isEmpty(addEventsSuccess) && (
                <Alert
                  type="success"
                  showIcon
                  message="Added Event Organizer"
                  className="w-50 my-2"
                />
              )}
              <Form onFinish={onFinishEventOrganisers} layout="vertical">
                <Form.Item label="Organizer Name" name={"organizer"}>
                  <Select>
                    {eventsSuccess?.data?.users.map((user) => {
                      return (
                        <Select.Option key={user.id} value={user.id}>
                          {user.username}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Button
                  loading={addEventsLoading}
                  htmlType="submit"
                  type="primary"
                >
                  Add Tickets
                </Button>
              </Form>
            </div>
            <div className="w-75 m-1 p-1 bg-white">
              <Table
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={eventDetailsSuccess?.data?.event_organizers}
              />
            </div>
          </div>
        </TabPane>
        <TabPane key="add-tickets" tab="Add Tickets">
          <div className="d-flex align-items-start">
            <div className="w-25 mt-1 bg-white p-2">
              {!isEmpty(addEventsSuccess) && (
                <Alert
                  type="success"
                  showIcon
                  message="Added Event Organizer"
                  className="w-100 my-2"
                />
              )}
              <Form onFinish={onFinishTicket} layout="vertical">
                <Form.Item name={"name"} label="Name">
                  <Input />
                </Form.Item>
                <Form.Item label="Type" name={"ticket_type"}>
                  <Select>
                    {["Free", "Paid"].map((user) => {
                      return (
                        <Select.Option key={user} value={user}>
                          {user}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name={"available_quantity"}
                  label="Available Quantity"
                >
                  <InputNumber className="w-100" />
                </Form.Item>
                <Form.Item name={"price"} label="Price">
                  <InputNumber className="w-100" />
                </Form.Item>
                <Button
                  loading={addEventsLoading}
                  htmlType="submit"
                  type="primary"
                >
                  Add Ticket
                </Button>
              </Form>
            </div>
            <div className="w-75 mx-1">
              <Table
                rowKey={(record) => record.id}
                columns={ticketColumns}
                dataSource={eventDetailsSuccess?.data?.tickets}
              />
            </div>
          </div>
        </TabPane>
        <TabPane key="add-activites" tab="Add Activites">
          <div className="d-flex align-items-start">
            <div className="w-25 mt-1 bg-white p-2">
              {!isEmpty(addEventsSuccess) && (
                <Alert
                  type="success"
                  showIcon
                  message="Added Event Organizer"
                  className="w-100 my-2"
                />
              )}
              <Form onFinish={onFinishActivity} layout="vertical">
                <Form.Item name={"activity"} label="Name">
                  <Input />
                </Form.Item>
                <Form.Item label="Description" name={"description"}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item name={"start_time"} label="Start Time">
                  <DatePicker className="w-100" />
                </Form.Item>
                <Form.Item name={"end_time"} label="End Time">
                  <DatePicker className="w-100" />
                </Form.Item>
                <Button
                  loading={addEventsLoading}
                  htmlType="submit"
                  type="primary"
                >
                  Add Activity
                </Button>
              </Form>
            </div>
            <div className="w-75 mx-1">
              <Table
                rowKey={(record) => record.id}
                columns={activitesColumns}
                dataSource={eventDetailsSuccess?.data?.event_activities}
              />
            </div>
          </div>
        </TabPane>
      </Tabs>
    </AppContainer>
  );
};

export default ManageEvents;
