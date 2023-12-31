export interface Class {
  [key: number | string]: string | number | boolean | undefined;
  id?: number;
  gradeName?: string;
  gradeId?: string;
  className?: string;
  quantity?: number;
  homeroomTeacher?: string;
  teacher_id?: number
}
