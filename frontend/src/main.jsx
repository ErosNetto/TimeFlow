import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import { store } from "./store.js";

// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import UserLayout from "./components/Layout//UserLayout/UserLayout.jsx";
import CompanyLayout from "./components/Layout/CompanyLayout/CompanyLayout.jsx";

// Pages
import UserHomePage from "./pages/User/UserHomePage/UserHomePage.jsx";
import UserLogin from "./pages/User/UserAuth/Login.jsx";
import UserRegister from "./pages/User/UserAuth/Register.jsx";

import CompanyHomePage from "./pages/Company/CompanyHomePage/CompanyHomePage.jsx";
import CompanyLogin from "./pages/Company/CompanyAuth/Login.jsx";
import CompanyRegister from "./pages/Company/CompanyAuth/Register.jsx";

import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <UserLayout>
            <UserHomePage />
          </UserLayout>
        ),
      },
      {
        path: "/company",
        element: (
          <CompanyLayout>
            <CompanyHomePage />
          </CompanyLayout>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/register",
    element: <UserRegister />,
  },
  {
    path: "/company/login",
    element: <CompanyLogin />,
  },
  {
    path: "/company/register",
    element: <CompanyRegister />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
