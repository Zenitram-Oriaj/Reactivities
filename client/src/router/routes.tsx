import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../app/layout/App";
import HomePage from "../pages";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard.tsx";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetails from "../features/activities/details/ActivityDetails";
import TestErrors from "../features/errors/TestError";
import NotFound from "../features/errors/NotFound";
import ServerError from "../features/errors/ServerError";
import NotAuthorized from "../features/errors/NotAuthorized";
import Forbidden from "../features/errors/Forbidden";


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
      { path: 'errors', element: <TestErrors/> },
      { path: 'server-error', element: <ServerError/> },
      { path: 'not-found', element: <NotFound/> },
      { path: 'not-authorized', element: <NotAuthorized/> },
      { path: 'forbidden', element: <Forbidden/> },
      { path: '*', element: <Navigate replace to='/not-found' /> }
    ]
  }
];

export const router = createBrowserRouter(routes);