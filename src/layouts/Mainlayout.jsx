import useNotification from "../components/hooks/useNotification";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import usePrevious from "../components/hooks/usePrevious";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import actions from "../config/actions";
import AppDrawer from "../components/shared/AppDrawer";
import { getAccessToken } from "../config/services/storage.service";
const { authActions } = actions;

const MainLayout = () => {
  const { serverSuccess, serverError } = useSelector((state) => state.server);
  const { authUserSuccess } = useSelector((state) => state.auth);
  const prevState = usePrevious({ serverSuccess, serverError });
  const token = getAccessToken();
  const dispatch = useDispatch();
  useNotification(prevState, serverError, serverSuccess);

  useEffect(() => {
    if (isEmpty(authUserSuccess) && token) dispatch(authActions.getAuthUser());
  }, [token]);

  return (
    <>
      <AppDrawer />
      <Outlet />
    </>
  );
};
export default MainLayout;
