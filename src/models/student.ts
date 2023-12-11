export interface Student {
  [key: number | string]: string | number | boolean | undefined;
  id: number;
  studentCode: string;
  name: string;
  dateOfBirth: string;
  classId?: string;
  className?: string;
  gender: string;
  address: string;
  phone: string;
}
