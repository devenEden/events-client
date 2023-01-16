import Aos from "aos";
import React, { createElement } from "react";
import { useEffect } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import routes from "./config/routing/routes";
import PageNotFound from "./containers/app/PageNotFound";
import MainLayout from "./layouts/Mainlayout";

const App = () => {
  useEffect(() => {
    Aos.init({ easing: "ease-in" });
  }, []);
  return (
    <div>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path={routes.internalRoutes.path} element={<MainLayout />}>
              {routes.internalRoutes.children.map((child) => {
                return (
                  <Route
                    key={child.path}
                    path={child.path}
                    element={createElement(child.element)}
                  />
                );
              })}
            </Route>
            <Route
              path={routes.externalRoutes.path}
              element={createElement(routes.externalRoutes.element)}
            >
              {routes.externalRoutes.children.map((child) => {
                return (
                  <Route
                    key={child.path}
                    path={child.path}
                    element={createElement(child.element)}
                  />
                );
              })}
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </div>
  );
};

export default App;
