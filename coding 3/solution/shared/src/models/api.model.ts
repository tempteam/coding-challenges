export type ResponseDto<T> = {
  data: T;
  totalRecords: number;
  totalPages: number;
};

export type QueryParams = Record<string, string | number>;
