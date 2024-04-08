import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import { store } from "./store.js";

// React router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home.jsx";
import UserLogin from "./pages/UserAuth/Login.jsx";
import UserRegister from "./pages/UserAuth/Register.jsx";
import CompanyLogin from "./pages/CompanyAuth/Login.jsx";
import CompanyRegister from "./pages/CompanyAuth/Register.jsx";

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
    path: "/user/login",
    element: <UserLogin />,
  },
  {
    path: "/user/register",
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
