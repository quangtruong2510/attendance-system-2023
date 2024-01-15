import axios, { Method } from 'axios';
export type Request = {
  endpoint: string;
  method: Method;
  body?: string
};

/* eREslint-disable  @typescript-eslint/no-explicit-any */
export const execute = async (
  request: Request,
  payload?: JSON
): Promise<any> => {
  const response = await requestAPI(request, payload)

  return response.data;
};

export const executeFormData = async (
  request: Request,
  payload?: JSON
): Promise<any> => {
  const response = await requestAPIFormData(request, payload)

  return response.data;
};
const requestAPI = async (request: Request, payload?: JSON): Promise<any> => {
  const apiToken = localStorage.getItem('token');
  const headers: any = {
    'Content-Type': 'application/json',
    Accept: request.body ? request.body : 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Token ${apiToken}`,
  };
  return await axios({
    headers: { ...headers },
    url: `${request.endpoint}`,
    method: request.method,
    data: payload === null ? null : JSON.stringify(payload),
  });
};

const requestAPIFormData = async (request: Request, payload?: any): Promise<any> => {
  const apiToken = localStorage.getItem('token');
  const headers = new Headers({
    Authorization: `Bearer ${apiToken}`,
  });
  return await fetch(request.endpoint, {
    headers: headers,
    method: request.method,
    body: payload,
  });
};
