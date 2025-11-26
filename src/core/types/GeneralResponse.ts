export default interface GeneralResponse<T> {
  message: string;
  description: string;
  data: T;
  error: boolean;
}
