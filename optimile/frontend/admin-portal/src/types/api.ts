export type ApiError = { code: string; message: string; details?: unknown };
export type ApiSuccess<T> = { success: true; data: T; message?: string };
export type ApiFailure = { success: false; error: ApiError };
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type Paged<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};
