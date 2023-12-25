import axios, { Method } from 'axios';
export type Request = {
  endpoint: string;
  method: Method;
};

/* eREslint-disable  @typescript-eslint/no-explicit-any */
export const execute = async (
  request: Request,
  payload?: JSON
): Promise<any> => {
  const response = await requestAPI(request, payload)

  return response.data;
};
const requestAPI = async (request: Request, payload?: JSON): Promise<any> => {
  const apiToken = localStorage.getItem('token');
  console.log("API token", apiToken);

  const headers: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
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
