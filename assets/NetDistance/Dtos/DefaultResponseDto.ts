export class DefaultResponseDto<T> {
  data: T | null;
  message: string;
  error: boolean;
}
