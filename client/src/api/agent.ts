import axios, { AxiosError, AxiosResponse } from 'axios';
import { IActivity } from '../interfaces/activity';
import { toast } from 'react-toastify';
import { router } from '../router/routes';
import { store } from '../stores/store';
import { IUser, IUserFormValues } from '../interfaces/user';


const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

// interface ValidationErrors {
//   Category?: string[];
//   City?: string[];
//   Date?: string[];
//   Description?: string[];
//   Title?: string[];
//   Venue?: string[];
// }

// interface DataError {
//   [key: string]: string[];
// }
// interface DataErrorResponse {
//   errors: DataError;
// }

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async (res: AxiosResponse) => {
  await sleep(1000);
  return res;
}, (err: AxiosError) => {
  const { status, data, config } = err.response as AxiosResponse
  switch (status) {
    case 400: {
      if(config.method === 'get' && data.errors.hasOwnProperty('id')) {
        router.navigate('/not-found');
        return;
      }
      if (typeof data !== 'string' && data.errors) {
        const modelStateErrors = [];
        const {errors} = data;
        for(const key in errors) {
          console.log(key);
          if(errors[key]) {
            console.log(errors[key]);
            modelStateErrors.push(errors[key])
          }
        }
        throw modelStateErrors.flat();
      }
      else toast.error(data as string);
      break;
    }
    case 401: {
      toast.error('unauthorized');
      break;
    }
    case 403: {
      toast.error('forbidden');
      break;
    }
    case 404: {
      router.navigate('not-found');
      break;
    }
    case 500: {
      store.commonStore.setServerError(data);
      router.navigate('/server-error');
      break;
    }
    default: { break; }
  }
  return Promise.reject(err);
});

const resBody = <T>(res: AxiosResponse<T>) => res.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(resBody),
  post: <T>(url: string, body: unknown) => axios.post<T>(url, body).then(resBody),
  put: <T>(url: string, body: unknown) => axios.put<T>(url, body).then(resBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(resBody),
};

const Activities = {
  list: () => requests.get<IActivity[]>('/activities'),
  details: (id: string) => requests.get<IActivity>(`/activities/${id}`),
  create: (activity: IActivity) => requests.post<void>('/activities', activity),
  update: (activity: IActivity) => requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete<IActivity>(`/activities/${id}`)
};

const Account = {
  current: () => requests.get<IUser>('/account'),
  login: (user: IUserFormValues) => requests.post<IUser>('/account/login', user),
  register: (user: IUserFormValues) => requests.post<IUser>('/account/register', user),
  logout: () => requests.get('/account/logout')
}

const agent = {
  Activities,
  Account
};

export default agent;