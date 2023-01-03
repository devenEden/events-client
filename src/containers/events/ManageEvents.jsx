import { Form, Tabs } from "antd";
import React from "react";
import AppContainer from "../../components/shared/AppContainer";
const { TabPane } = Tabs;

const ManageEvents = () => {
  return (
    <AppContainer title={"Manage Events"}>
      <Tabs>
        <TabPane key="add-event" tab="Add Event">
          <div className="d-flex">
            <div className="w-50">
              <h5 className="fw-normal">Add Event</h5>
              <Form layout="vertical"></Form>
            </div>
            <div className="w-50"></div>
          </div>
        </TabPane>
        <TabPane key="add-organizers" tab="Add Organizers"></TabPane>
        <TabPane key="add-tickets" tab="Add Tickets"></TabPane>
        <TabPane key="add-activites" tab="Add Activites"></TabPane>
      </Tabs>
    </AppContainer>
  );
};

export default ManageEvents;
