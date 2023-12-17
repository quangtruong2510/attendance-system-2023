export default interface Payload {
  key: any;
  value: any;
}

export interface PaginationState {
  current: number;
  perPage: number;
}

// export interface Options {
//   id: number;
//   value: string;
// }

export interface OptionSelect {
  value: number;
  label: string | number;
}
