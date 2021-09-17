import { MorphOneOptions } from '../..';
import { QueryBuilder } from '../query-builder';
import { Relation } from './relation';

export class MorphOneRelation extends Relation<MorphOneOptions> {
  type?: string;
  id?: string;

  prepareOptions() {
    this.type = this.options.type ?? `${this.options.morphName}_type`;
    this.id = this.options.id ?? `${this.options.morphName}_id`;
  }

  getRelation() {
    return this.createRelation({
      relation: this.target.HasOneRelation,
      join: {
        from: this.joinFrom,
        to: this.joinTo,
      },
      filter: (builder: QueryBuilder<any>) => {
        const typeValue = this.options.typeValue || this.target.name;

        builder.where(this.type, typeValue);
      },
      beforeInsert: (model: any) => {
        model[this.type] = this.target.name;
      },
    });
  }

  get joinTo() {
    return `${this.related.tableName}.${this.id}`;
  }
}
