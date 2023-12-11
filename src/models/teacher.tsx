export interface Teacher {
  [key: number | string]: string | number | boolean | undefined;
  id: number;
  name: string;
  homeroomClass?: string;
  address?: string;
  phone?: string;
  account: string;
}
