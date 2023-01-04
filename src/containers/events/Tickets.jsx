import { Form, Select, Card, Avatar } from "antd";
import React from "react";
import AppContainer from "../../components/shared/AppContainer";
import EventCard from "../../components/events/EventCard";

const Tickets = () => {
  return (
    <AppContainer title={"Tickets"}>
      <div className="mt-3">
        <div className="p3 w-100 border-bottom " />
        <div className="w-100 d-flex align-items-start">
          <div className="d-flex flex-wrap py-2 w-75">
            <EventCard
              address="Logogo"
              title="Ruger Ruger"
              category="Afro beat"
              summary="Ruger Ruger is a Nigerian singer and songwriter. He is best known for his hit single, “One Shirt”."
            />
          </div>
          <div className="w-25 mt-2">
            <Card bordered={false} style={{ width: 300 }}>
              <div>
                <Form layout="vertical">
                  <Form.Item label="Event: " name={"name"}>
                    <Select className="w-100" />
                  </Form.Item>
                  <Form.Item label="Ticket: " name={"name"}>
                    <Select className="w-100" />
                  </Form.Item>
                  <Form.Item label="Quantity: " name={"name"}>
                    <Select className="w-100" />
                  </Form.Item>
                  <Form.Item>
                    <button className="btn btn-primary w-100">Order</button>
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
