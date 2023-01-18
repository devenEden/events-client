import React, { useEffect } from "react";
import actions from "../../config/actions";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Upload, Button, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { appUiActions, eventActions } = actions;

const UploadEventImages = () => {
  const dispatch = useDispatch();
  const { uploadEventImagesModal } = useSelector((state) => state.appUi);
  const {
    uploadEventImagesLoading,
    uploadEventImagesSuccess,
    eventDetailsSuccess,
    eventDetailsLoading,
  } = useSelector((state) => state.events);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("image", values.image.file.originFileObj);
    formData.append("type", "image");
    formData.append("is_admin", "true");
    dispatch(eventActions.uploadEventImages(formData, eventDetailsSuccess?.id));
  };

  useEffect(() => {
    if (uploadEventImagesSuccess) {
      dispatch(appUiActions.toggleUploadEventImagesModal(false));
      dispatch(eventActions.getMyEvents());
    }
  }, [uploadEventImagesSuccess]);

  return (
    <Modal
      title="Upload Event Images"
      open={uploadEventImagesModal}
      onCancel={() =>
        dispatch(appUiActions.toggleUploadEventImagesModal(false))
      }
      footer={null}
    >
      {eventDetailsLoading && <Spin />}
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="image"
          rules={[
            {
              required: true,
              message: "Please upload event images!",
            },
          ]}
        >
          <Upload.Dragger maxCount={1}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag image to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={uploadEventImagesLoading}
          >
            Upload
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadEventImages;
