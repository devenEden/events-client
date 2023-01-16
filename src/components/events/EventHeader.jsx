import { Avatar, Button, Input, Menu, Popover } from "antd";
import React from "react";
import config from "../../../env.json";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearToken,
  getAccessToken,
} from "../../config/services/storage.service";
import actions from "../../config/actions";
const { appUiActions } = actions;

const EventHeader = () => {
  const navigate = useNavigate();
  const token = getAccessToken();
  const dispatch = useDispatch();

  const { authUserSuccess: user } = useSelector((state) => state.auth);
  const openDrawer = () => dispatch(appUiActions.toggleAppDrawer(true));
  const logoutUser = () => {
    clearToken();
    navigate("/");
  };
  return (
    <div className="events-header shadow-sm w-100 bg-white d-flex align-items-center">
      <h3 className="fw-bold w-25 ml-5 m-0">
        <Link to="/">eventsApp</Link>
      </h3>
      <div className="d-none d-lg-flex mx-4 w-75 align-items-center">
        <Menu className="w-25 mx-3 border-0" mode="horizontal">
          <Menu.Item onClick={() => navigate("/")} key="1">
            Home
          </Menu.Item>
          <Menu.Item onClick={() => navigate("/my-events")} key="2">
            My Events
          </Menu.Item>
          <Menu.Item onClick={() => navigate("/my-tickets")} key="3">
            My Tickets
          </Menu.Item>
        </Menu>
        <div className="w-50 d-md-flex align-items-center">
          <Input
            prefix={<AiOutlineSearch />}
            size="large"
            placeholder="Event Name, Categories, Types, etc. "
            className="rounded-pill"
          />
          <Button className="mx-1" shape="round" size="large">
            Search
          </Button>
        </div>
        <div className="w-25 d-flex">
          {token ? (
            <div className="d-flex align-items-center">
              <Popover
                content={
                  <>
                    <Button onClick={() => logoutUser()}>Log Out</Button>
                  </>
                }
                placement="bottom"
              >
                <Button type="text">{user?.user?.username}</Button>
              </Popover>
              <Avatar
                size={"large"}
                src={`${config.IMAGE_BASE_URL}/${user?.user?.avatar}`}
              />
            </div>
          ) : (
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => navigate("/auth/login")}
                type="text"
                shape="round"
                size="large"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/auth/signup")}
                type="primary"
                shape="round"
                size="large"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="w-75 d-lg-none  d-flex justify-content-end align-items-center">
        {token ? (
          <div className="d-flex align-items-center">
            <Popover
              content={<Button onClick={logoutUser}>Logout</Button>}
              placement="bottom"
            >
              <Button type="text">{user?.user?.username}</Button>
            </Popover>
          </div>
        ) : (
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => navigate("/auth/login")}
              type="text"
              shape="round"
              size="large"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/auth/signup")}
              type="primary"
              shape="round"
              size="large"
            >
              Sign Up
            </Button>
          </div>
        )}
        <Button shape="rounded" onClick={openDrawer} className="mx-1">
          <AiOutlineMenu />
        </Button>
      </div>
    </div>
  );
};

export default EventHeader;
