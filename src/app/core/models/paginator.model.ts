export const PageSizes = [5, 10, 15, 25, 50, 100, 200, 300, 500];

export interface IPaginatorState {
  page: number;
  pageSize: number;
  total: number;
  recalculatePaginator?(total: number): IPaginatorState;
}

export class PaginatorState implements IPaginatorState {
  page = 1;
  current_page = 1;
  per_page = 25;
  pageSize: number = PageSizes[2];
  total = 0;
  pageSizes?: number[] = [];
  from?: number;
  to?: number;

  recalculatePaginator?(total: number): PaginatorState {
    this.total = total;
    return this;
  }
}

export interface IPaginatorView {
  paginator: PaginatorState;
  ngOnInit(): void;
  paginate(paginator: PaginatorState): void;
}
