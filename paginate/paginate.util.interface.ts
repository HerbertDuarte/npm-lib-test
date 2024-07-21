import { PaginateProps, PaginateResponse } from "./paginate.util";

export interface IPaginateUtil<T> {
  execute(props: PaginateProps): Promise<PaginateResponse<T>>;
}
