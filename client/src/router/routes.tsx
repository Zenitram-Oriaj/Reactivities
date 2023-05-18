import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../app/layout/App";
import HomePage from "../pages";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard.tsx";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetails from "../features/activities/details/ActivityDetails";
import TestErrors from "../features/errors/TestError";


export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'activities', element: <ActivityDashboard /> },
      { path: 'activities/:id', element: <ActivityDetails /> },
      { path: 'activities/create', element: <ActivityForm key='create'/> },
      { path: 'activities/manage/:id', element: <ActivityForm key='manage'/> },
      { path: 'errors', element: <TestErrors/> }
    ]
  }
];

export const router = createBrowserRouter(routes);