import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage.page/MainPage.page";
import NoPage from "../pages/NoPage.page/NoPage.page";
import Dashboard from "../pages/Dashboard.page/Dashboard.page";
import ChooseAccount from "../pages/Auth.page/Register/ChooseAccount/ChooseAccount.comp";
import UserInfoStep from "../pages/Auth.page/Register/UserInfoStep/UserInfoStep.comp";
import AdminInfoStep from "../pages/Auth.page/Register/AdminInfoStep/AdminInfoStep.comp";
import ConfirmEmail from "../pages/Auth.page/Register/ConfirmEmail/ConfirmEmail.comp";
import LoginForm from "../pages/Auth.page/Login/LoginForm/LoginForm.comp";
import LayoutSideBar from "../components/general/LayoutSideBar";
import Settings from "../pages/Settings.page/Settings.page";
import Surveys from "../pages/Surveys.page/Surveys.page";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/register",
    element: <ChooseAccount />,
  },
  {
    path: "/register_user",
    element: <UserInfoStep />,
  },
  {
    path: "/register_admin",
    element: <AdminInfoStep />,
  },
  {
    path: "/register_verification",
    element: <ConfirmEmail />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <LayoutSideBar />,
    children: [{ path: "", element: <Dashboard /> }],
  },
  {
    path: "/settings",
    element: <LayoutSideBar />,
    children: [{ path: "", element: <Settings /> }],
  },
  {
    path: "/survey/:name",
    element: <LayoutSideBar />,
    children: [{ path: "", element: <Surveys /> }],
  },
  {
    path: "/*",
    element: <NoPage />,
  },
]);
