import { Model as ObjectionModel } from 'objection';
import { PaginationOptions } from '../interfaces';
import { Model } from '../orm';

export class AbstractPaginator<T extends ObjectionModel> {
  data: T[];

  total: number;

  perPage: number;

  currentPage: number;

  totalPerPage?: number;

  constructor(data: T[], total: number, options: PaginationOptions) {
    this.data = data;
    this.total = total;
    this.perPage = options.perPage;
    this.currentPage = Number(options.page);
    this.totalPerPage = data.length;
  }

  get nextPage() {
    return this.currentPage < this.lastPage ? this.currentPage + 1 : null;
  }

  get lastPage() {
    return Math.max(Math.ceil(this.total / this.perPage), 1);
  }

  get prevPage() {
    return this.currentPage > 1 ? this.currentPage - 1 : null;
  }

  toResponse() {
    return {
      ...this,
      data: this.data.map((d) => this.serialize(d)),
      nextPage: this.nextPage,
      prevPage: this.prevPage,
      lastPage: this.lastPage,
    };
  }

  private serialize(data: any) {
    if (data instanceof Model) {
      return data.serialize();
    }

    return data;
  }
}
