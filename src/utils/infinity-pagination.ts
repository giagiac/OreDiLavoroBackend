import { IPaginationOptions } from './types/pagination-options';
import { InfinityPaginationResponseDto } from './dto/infinity-pagination-response.dto';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
): InfinityPaginationResponseDto<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};

export const infinityPaginationQueryBuilder = <T>(
  data: T[],
  count: number,
): InfinityPaginationResponseDto<T> => {
  return {
    data,
    hasNextPage: data.length !== count,
  };
};
