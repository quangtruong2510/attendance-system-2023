export interface Class {
  [key: number | string]: string | number | boolean | undefined;
  id: number;
  grade: string;
  class: string;
  quantity?: number;
  homeroomTeacher?: string;
  phone?: string;
}
