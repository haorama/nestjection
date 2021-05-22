import { classToPlain } from "class-transformer";
import { Model } from "objection";
import { PaginationOptions } from "src/options";
import { objExcept } from "src/utils";

export class AbstractPaginator<T extends Model> {
    data: T[];

    total: number;

    perPage: number;

    currentPage: number;

    totalPerPage?: number;

    req: any;

    constructor(data: T[], total: number, options: PaginationOptions) {
        this.data = data;
        this.total = total;
        this.perPage = options.perPage;
        this.currentPage = options.page;
        this.totalPerPage = data.length;
    }

    get nextPage() {
        return this.currentPage < this.lastPage ? this.currentPage + 1 : null;
    }

    get lastPage() {
        return Math.max( Math.ceil(this.total / this.perPage), 1)
    }

    get prevPage() {
        return this.currentPage > 1 ? this.currentPage - 1 : null;
    }

    toResponse() {
        return {
            ...objExcept(this, ['req']),
            data: this.data.map(model => classToPlain(model)),
            nextPage: this.nextPage,
            prevPage: this.prevPage,
            lastPage: this.lastPage
        }
    }
}