import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const App = lazy(() => import("../App"));
const Home = lazy(() => import("../pages/Home"));

export const routes = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/repartistage", element: <Home /> },
    ]
  }
])