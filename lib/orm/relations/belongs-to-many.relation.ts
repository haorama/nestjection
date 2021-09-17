import { BelongsToManyOptions } from '../../interfaces';
import { toSnakeCase } from '../../utils';
import { Model } from '../model';
import { Relation } from './relation';

export class BelongsToManyRelation extends Relation<BelongsToManyOptions> {
  table: string;

  prepareOptions() {
    this.table =
      this.options.table ??
      `${toSnakeCase(this.related.name)}_${toSnakeCase(this.target.name)}`;
  }

  getRelation() {
    return this.createRelation({
      relation: Model.ManyToManyRelation,
      join: {
        from: this.joinFrom,
        to: this.joinTo,
        through: this.joinThrough,
      },
    });
  }

  get joinTo() {
    return `${this.related.tableName}.id`;
  }

  get joinThrough() {
    if (!this.table) return null;

    return {
      from: `${this.table}.${toSnakeCase(this.target.name)}_id`,
      to: `${this.table}.${toSnakeCase(this.related.name)}_id`,
    };
  }
}
