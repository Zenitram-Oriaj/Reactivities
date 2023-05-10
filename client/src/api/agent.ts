import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../interfaces/activity';


const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  })
};

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async (res: AxiosResponse) => {
  try {
    await sleep(1000)
    return res;
  } catch (err: unknown) {
    console.error(err);
    return await Promise.reject(err);
  }
})

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

const agent = {
  Activities
};

export default agent;