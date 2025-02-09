import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage.page/MainPage.page";
import NoPage from "../pages/NoPage.page/NoPage.page";
import Dashboard from "../pages/Dashboard.page/Dashboard.page";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/*",
    element: <NoPage />,
  },
]);
