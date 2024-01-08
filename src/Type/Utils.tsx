enum StatusAttendanceType {
  PRESENT = 1,
  ABSENCE_WITH_PERMISSION = 4,
  ABSENCE_WITHOUT_PERMISSION = 2,
  LATE = 3,
}

enum Gender {
  MALE = 1,
  FEMALE = 2,
}

export interface FilterCriteria {
  [key: string]: {
    value: any;
    strict?: boolean;
    foreignKey?: number;
  };
}

export { StatusAttendanceType, Gender };
