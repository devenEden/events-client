import { Drawer, Menu } from "antd";
import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import actions from "../../config/actions";
import { clearToken } from "../../config/services/storage.service";
const { appUiActions } = actions;

const AppDrawer = () => {
  const { appDrawer } = useSelector((state) => state.appUi);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutUser = () => {
    clearToken();
    navigate("/");
  };

  const closeDrawer = () => dispatch(appUiActions.toggleAppDrawer(false));
  return (
    <Drawer onClose={closeDrawer} open={appDrawer}>
      <Menu className=" mx-3 border-0" mode="vertical">
        <Menu.Item
          icon={<AiOutlineHome />}
          onClick={() => navigate("/")}
          key="1"
        >
          Home
        </Menu.Item>
        <Menu.Item icon={<AiOutlineCalendar />} key="2">
          Events
        </Menu.Item>
        <Menu.Item onClick={logoutUser} icon={<AiOutlineLogout />} key="3">
          LogOut
        </Menu.Item>
      </Menu>
    </Drawer>
  );
};

export default AppDrawer;
