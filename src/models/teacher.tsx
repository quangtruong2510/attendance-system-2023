export interface Teacher {
  [key: number | string]: string | number | boolean | undefined;
  id?: number;
  name?: string;
  homeroomClass?: string;
  classId?: number;
  address?: string;
  phone?: string;
}
