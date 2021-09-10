import { QueryBuilder as ObjectionQueryBuilder, Model as ObjectionModel, Page } from 'objection';
import { arrayDiff } from '../utils';
import { PaginationOptions } from '../interfaces';
import { SimplePaginator } from '../paginators';

export class QueryBuilder<Model extends ObjectionModel, R = Model[]> extends ObjectionQueryBuilder<Model, R> {
    ArrayQueryBuilderType!: QueryBuilder<Model, Model[]>;
    SingleQueryBuilderType!: QueryBuilder<Model, Model>;
    NumberQueryBuilderType!: QueryBuilder<Model, number>;
    PageQueryBuilderType!: QueryBuilder<Model, Page<Model>>;

    constructor(modelClass: any) {
        super(modelClass);
    }

    /** Find the given query without soft remove data */
    noTrashed(shouldApply: boolean = true) {
        if (shouldApply) {
            return this.whereNull('deleted_at');
        }
    }

    /** Find object limit by 1 or throw if not found */
    firstOrFail() {
        return this.throwIfNotFound().first();
    }

    /** Paginate the given model */
    async paginate(options?: PaginationOptions) {
        options = {
            perPage: 10,
            page: 1,
            ...options,
        }

        const { results, total } = await this.page(options.page - 1, options.perPage);

        return new SimplePaginator<Model>(results, total, options);
    }

    /**
     * Order latest query by given column param
     */
    latest(column: string = 'created_at') {
        return this.orderBy(column, 'desc');
    }

    /**
     * Order oldest query by given column param
     */
    oldest(column: string = 'created_at') {
        return this.orderBy(column, 'asc');
    }

    /** Get the average of selected column, from relation or direct */
    async getAvg(name: string, alias?: string) {
        const avg = await this.avg(`${name} as ${alias || name}`).context({skipFind: true});

        return Number(avg[0][alias || name]);
    }

    /** Sum the data by given column name, or aliasing it */
    async getSum(name: string, alias?: string) {
        const sum = await this.sum(`${name} as ${alias || name}`).context({skipFind: true});

        return Number(sum[0][alias || name] || 0);
    }

    /** Sync the intermediate tables with a list of ids or models, this method is unstable and maybe cannot be implement in one to one relation */
    async sync(ids: any[], detaching: boolean = true, columns: any = {}) {
        const current = (await this as any).map((r: Model) => r.$id());
        const detach = arrayDiff(current, ids);
        const attach = arrayDiff(ids, current);

        if (detach.length && detaching) {
            await this.alias('sync_pivot').whereIn('sync_pivot.id', detach).unrelate();
        }

        if (attach.length) {
            await Promise.all(attach.map(async(id) => {
                const clone = (this.clone() as any);

                const compositeKeys = {
                    id,
                    ...columns
                }

                return await clone.relate(compositeKeys);
            }))
        }

        return { attach, detach };
    }

    /** update or create model by given whereOptions keys */
    async updateOrCreate(identifiers: any, extra: any = {}) {
        const model = await this.where(identifiers).first();

        const data = {
            ...identifiers,
            ...extra
        }

        if (model && model instanceof ObjectionModel) {
            return this.patch(data);
        }

        return await this.insert(data)
    }

    async firstOrCreate(keys: any) {
        const model = await this.where(keys).first();

        if (!model) {
            return await this.insert(keys);
        }

        return model;
    }

    async firstOrNew(keys: any) {
        const model = await this.where(keys).first();

        if (!model) {
            return this.modelClass().fromJson(keys, {skipValidation: true});
        }

        return model;
    }

    withCount(relations: string | string[]) {
        if (!Array.isArray(relations)) relations = [relations]

        const selectCounts = relations.map(relation => {
            return this.modelClass().relatedQuery(relation).count().as(`${relation}_count`);
        })

        return this.select(...selectCounts)
    }

    whereJSON(jsonColumn: string, prop: string, value: any) {
        return this.whereRaw(`JSON_EXTRACT(${jsonColumn}, "$.${prop}") = ?`, [value]);
    }

    /** Check if model has the given relation */
    whereHas(relation: keyof Model, callback?: (query: any) => void) {
        const related = this.modelClass().relatedQuery(relation);

        if (callback) callback(related)

        return this.whereExists(related);
    }

    /** Check if model doesnt have the given relation */
    whereDoesntHave(relation: keyof Model) {
        const related = this.modelClass().relatedQuery(relation);

        return this.whereNotExists(related);
    }
}