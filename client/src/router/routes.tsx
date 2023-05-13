import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../app/layout/App";
import HomePage from "../pages";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard.tsx";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetails from "../features/activities/details/ActivityDetails";


export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/activities',
    element: <App />,
    children: [
      { path: '', element: <ActivityDashboard /> },
      { path: ':id', element: <ActivityDetails /> },
      { path: 'create', element: <ActivityForm key='create'/> },
      { path: 'manage/:id', element: <ActivityForm key='manage'/> }
    ]
  }
];

export const router = createBrowserRouter(routes);