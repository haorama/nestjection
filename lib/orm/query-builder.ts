import {
  QueryBuilder as ObjectionQueryBuilder,
  Model as ObjectionModel,
  Page,
  raw,
} from 'objection';
import {
  PaginationOptions,
  SyncOptions,
  WhereDateOptions,
} from '../interfaces';
import { SimplePaginator } from '../paginators';
import { arrayDiff, isObject } from '../utils';
import merge from 'lodash.merge';
import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

export class QueryBuilder<
  M extends ObjectionModel,
  R = M[],
> extends ObjectionQueryBuilder<M, R> {
  ArrayQueryBuilderType!: QueryBuilder<M, M[]>;
  SingleQueryBuilderType!: QueryBuilder<M, M>;
  NumberQueryBuilderType!: QueryBuilder<M, number>;
  PageQueryBuilderType!: QueryBuilder<M, Page<M>>;

  constructor(modelClass: any) {
    super(modelClass);
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
    };

    const { results, total } = await this.page(
      options.page - 1,
      options.perPage,
    );

    return new SimplePaginator<M>(results, total, options);
  }

  /**
   * Order latest query by given column param
   */
  latest(column = 'created_at') {
    return this.orderBy(column, 'desc');
  }

  /**
   * Order oldest query by given column param
   */
  oldest(column = 'created_at') {
    return this.orderBy(column, 'asc');
  }

  /** Get the average of selected column, from relation or direct */
  async getAvg(name: string, alias?: string) {
    const avg = await this.avg(`${name} as ${alias || name}`).context({
      skipFind: true,
    });

    return Number(avg[0][alias || name]);
  }

  /** Sum the data by given column name, or aliasing it */
  async getSum(name: string, alias?: string) {
    const sum = await this.sum(`${name} as ${alias || name}`).context({
      skipFind: true,
    });

    return Number(sum[0][alias || name] || 0);
  }

  /** update or create model by given whereOptions keys */
  async updateOrCreate(identifiers: any, extra: any = {}) {
    const model = await this.where(identifiers).first();

    const data = {
      ...identifiers,
      ...extra,
    };

    if (model && model instanceof ObjectionModel) {
      return this.patch(data);
    }

    return await this.insert(data);
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
      return this.modelClass().fromJson(keys, { skipValidation: true });
    }

    return model;
  }

  withCount(relations: string | string[]) {
    if (!Array.isArray(relations)) relations = [relations];

    const selectCounts = relations.map((relation) => {
      return this.modelClass()
        .relatedQuery(relation)
        .count()
        .as(`${relation}_count`);
    });

    return this.select(...selectCounts);
  }

  /** Check if model has the given relation */
  whereHas(relation: keyof M, callback?: (query: any) => void) {
    const related = this.modelClass().relatedQuery(relation);

    if (callback) callback(related);

    return this.whereExists(related);
  }

  /** Check if model doesnt have the given relation */
  whereDoesntHave(relation: keyof M) {
    const related = this.modelClass().relatedQuery(relation);

    return this.whereNotExists(related);
  }

  private getDetachOptions(detachOrOptions?: boolean | SyncOptions) {
    let options: SyncOptions = {};

    if (detachOrOptions) {
      if (typeof detachOrOptions === 'boolean') {
        options.detaching = detachOrOptions;
      } else {
        options = detachOrOptions;
      }
    }

    return options;
  }

  sync(ids: any[], detaching?: boolean): Promise<any>;
  sync(ids: any[], options?: SyncOptions): Promise<any>;
  async sync(keys: any[], detachOrOptions?: boolean | SyncOptions) {
    const options = this.getDetachOptions(detachOrOptions);

    const idColumn = this.modelClass().idColumn as string;

    const ids: any[] = keys.map((key) => (isObject(key) ? key[idColumn] : key));

    const current: any[] = ((await this) as any).map((c: any) => c[idColumn]);

    const detach = arrayDiff(current, ids);

    const attach = arrayDiff(ids, current);

    if (options.detaching && detach.length) {
      await this.clone()
        .alias('sync_pivot')
        .whereIn(`sync_pivot.${idColumn}`, detach)
        .unrelate();
    }

    if (attach.length) {
      const relations = keys.filter((k) =>
        attach.includes(!isObject(k) ? k : k[idColumn]),
      );

      return await Promise.all(
        relations.map(async (relate) => await this.clone().relate(relate)),
      );
    }

    return true;
  }

  /**
   * Experimental
   *
   * compare a column's value against a date
   */
  whereDate(column: string, args: WhereDateOptions) {
    const options = merge(
      {
        operator: '=',
        dateFormat: '%Y-%m-%d',
      },
      args,
    );

    if (options.timezone) {
      const { valid, offset } = this.getTimezoneOffset(options.timezone);
      const dateBindings = [column, offset, options.dateFormat];

      if (!valid) throw new Error(`Timezone ${options.timezone} is invalid`);

      return this.where(
        raw(`date_format( CONVERT_TZ(??, 'SYSTEM', ?), ? )`, dateBindings),
        options.operator,
        options.value,
      );
    }

    return this.where(
      raw(`date_format(??, ?)`, [column, options.dateFormat]),
      options.operator,
      options.value,
    );
  }

  protected getTimezoneOffset(timezone?: string) {
    const date = timezone ? dayjs().tz(timezone) : dayjs();

    const offset = date.utcOffset() / 60;

    return {
      valid: date.isValid(),
      offset: offset >= 0 ? `+${offset}:00` : `${offset}:00`,
    };
  }
}
