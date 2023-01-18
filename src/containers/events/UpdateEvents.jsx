import React, { useEffect } from "react";
import actions from "../../config/actions";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Button, Select, Input, DatePicker, Spin } from "antd";
import moment from "moment";

const { appUiActions, eventActions } = actions;

const UpdateEvents = () => {
  const dispatch = useDispatch();
  const { updateEventsModal } = useSelector((state) => state.appUi);
  const {
    eventDetailsSuccess,
    eventDetailsLoading,
    updateEventsSuccess,
    updateEventsLoading,
  } = useSelector((state) => state.events);

  const [form] = Form.useForm();
  const { Option } = Select;

  const onFinish = (values) => {
    dispatch(eventActions.updateEvents(values, eventDetailsSuccess?.id));
  };

  useEffect(() => {
    if (updateEventsSuccess) {
      dispatch(appUiActions.toggleUpdateEventsModal(false));
      dispatch(eventActions.getMyEvents());
    }
  }, [updateEventsSuccess]);

  const fields = [
    {
      name: ["title"],
      value: eventDetailsSuccess?.title,
    },
    {
      name: ["summary"],
      value: eventDetailsSuccess?.summary,
    },
    {
      name: ["event_type"],
      value: eventDetailsSuccess?.event_type,
    },
    {
      name: ["category"],
      value: eventDetailsSuccess?.category,
    },
    {
      name: ["location"],
      value: eventDetailsSuccess?.location,
    },
    {
      name: ["start_date"],
      value: moment(eventDetailsSuccess?.start_date),
    },
    {
      name: ["end_date"],
      value: moment(eventDetailsSuccess?.end_date),
    },
    {
      name: ["location_link"],
      value: eventDetailsSuccess?.location_link,
    },
    {
      name: ["age_limit"],
      value: eventDetailsSuccess?.age_limit,
    },
    {
      name: ["is_private"],
      value: eventDetailsSuccess?.is_private ? "true" : "false",
    },
  ];

  return (
    <div>
      <Modal
        title="Update Event"
        open={updateEventsModal}
        onCancel={() => dispatch(appUiActions.toggleUpdateEventsModal(false))}
        footer={null}
        width={1000}
        bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
      >
        {!eventDetailsLoading ? (
          <Form
            form={form}
            layout="vertical"
            fields={fields}
            requiredMark={false}
            onFinish={onFinish}
            className="m-2 p-1"
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please input title!",
                },
              ]}
            >
              <Input placeholder="Title" size="large" />
            </Form.Item>
            <Form.Item
              name="summary"
              label="Summary"
              rules={[
                {
                  required: true,
                  message: "Please input summary!",
                },
              ]}
            >
              <Input.TextArea placeholder="Summary" size="large" />
            </Form.Item>
            <Form.Item
              name="event_type"
              label="Event Type"
              rules={[
                {
                  required: true,
                  message: "Please input event type!",
                },
              ]}
            >
              <Select placeholder="Event Type" size="large">
                <Option value="online">Online</Option>
                <Option value="physical">Physical</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please input category!",
                },
              ]}
            >
              <Select placeholder="Category" size="large">
                <Option value="music">Music</Option>
                <Option value="sports">Sports</Option>
                <Option value="food">Food</Option>
                <Option value="tech">Tech</Option>
                <Option value="art">Art</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="location"
              label="Location"
              rules={[
                {
                  required: true,
                  message: "Please input location!",
                },
              ]}
            >
              <Input placeholder="Location" size="large" />
            </Form.Item>
            <Form.Item
              name="location_link"
              label="Location Link"
              rules={[
                {
                  required: true,
                  message: "Please input location link!",
                },
              ]}
            >
              <Input placeholder="Location Link" size="large" />
            </Form.Item>
            <Form.Item
              name="start_date"
              label="Start Date"
              rules={[
                {
                  required: true,
                  message: "Please input start date!",
                },
              ]}
            >
              <DatePicker
                placeholder="Start Date"
                size="large"
                className="w-100"
              />
            </Form.Item>
            <Form.Item
              name="end_date"
              label="End Date"
              rules={[
                {
                  required: true,
                  message: "Please input end date!",
                },
              ]}
            >
              <DatePicker
                placeholder="End Date"
                size="large"
                className="w-100"
              />
            </Form.Item>
            <Form.Item
              name="age_limit"
              label="Age Limit"
              rules={[
                {
                  required: true,
                  message: "Please input age limit!",
                },
              ]}
            >
              <Input placeholder="Age Limit" size="large" />
            </Form.Item>
            <Form.Item
              name="is_private"
              label="Status"
              rules={[
                {
                  required: true,
                  message: "Please input is private!",
                },
              ]}
            >
              <Select placeholder="Status" size="large">
                <Option value="true">Private</Option>
                <Option value="false">Public</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={updateEventsLoading}
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div className="text-center">
            <Spin size="large" />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UpdateEvents;
