import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SearchBills from "./pages/SearchBills.jsx";
import AllBills from "./pages/AllBills.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "search-bills", element: <SearchBills /> },
          { path: "all-bills", element: <AllBills /> },
        ],
      },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={Router}>
      <StrictMode>
        <App />
      </StrictMode>
    </RouterProvider>
  </Provider>,
);
