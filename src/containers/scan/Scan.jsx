import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EventsPageContainer from "../../components/shared/EventsPageContainer";
import { getAccessToken } from "../../config/services/storage.service";
import { isEmpty } from "lodash";
import actions from "../../config/actions";
import { Avatar, Button, message, Table } from "antd";
import config from "../../../env.json";
import AppLoader from "../../components/shared/AppLoader";
const { scanActions } = actions;

const Scan = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { authUserSuccess: user } = useSelector((state) => state.auth);
  const { onScanSuccess: data, onScanLoading } = useSelector(
    (state) => state.scan
  );
  const token = getAccessToken();

  useEffect(() => {
    if (isEmpty(data)) {
      dispatch(scanActions.onScan({ data: params.id }));
    }
  }, [data]);

  const addScan = (activity_id) => {
    const scan = {
      user_id: data?.guest?.id,
      event_id: data?.eventDetails?.id,
      ticket_id: data?.ticket?.id,
      booking_id: data?.booking?.id,
      scan_type: "QR",
      activity_id,
    };
    message.loading("Loading... Please wait for a confimation");
    dispatch(scanActions.addScan(scan));
  };

  const columns = [
    {
      title: "Activity",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Actions",
      key: "action",
      render: (record) => {
        return (
          <Button
            onClick={() => addScan(record.id)}
            shape="round"
            type="primary"
          >
            Confirm
          </Button>
        );
      },
    },
  ];

  return (
    <EventsPageContainer>
      <AppLoader loading={onScanLoading}>
        <div className="w-100 d-flex justify-content-center">
          <div className="shadow d-flex flex-column align-items-center w-sm-100 w-50 border px-3 py-5 rounded-5">
            <Avatar
              size={150}
              src={`${config.IMAGE_BASE_URL}/${data?.guest?.avatar}`}
            />
            <h1 className="mt-3 fw-bold">
              {data?.guest?.surname} {data?.guest?.other_names}
            </h1>
            <Button type="primary" className="mb-2" shape="round">
              {data?.ticket?.name}
            </Button>
            <Button className="mb-3" shape="round">
              {data?.guest?.email}
            </Button>
            <h3>{data?.eventDetails?.title}</h3>
            <p className="text-center">{data?.eventDetails?.summary}</p>
            {token && user.user?.is_admin && (
              <>
                <Table
                  pagination={false}
                  className="w-75 my-3 w-sm-100"
                  rowKey={(record) => record.id}
                  columns={columns}
                  dataSource={data?.eventDetails?.activities}
                />
              </>
            )}
          </div>
        </div>
      </AppLoader>
    </EventsPageContainer>
  );
};

export default Scan;
