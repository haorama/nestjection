import { QueryBuilder } from '..';
import { MorphManyOptions } from '../..';
import { Relation } from './relation';

export class MorphManyRelation extends Relation<MorphManyOptions> {
  type?: string;
  id?: string;

  prepareOptions() {
    this.type = this.options.type ?? `${this.options.morphName}_type`;
    this.id = this.options.id ?? `${this.options.morphName}_id`;
  }

  getRelation() {
    const typeValue = this.options.typeValue || this.target.name;

    return this.createRelation({
      relation: this.target.HasManyRelation,
      filter: (builder: QueryBuilder<any>) => {
        builder.where(this.type, typeValue);
      },
      beforeInsert: (model: any) => {
        model[this.type] = typeValue;
      },
      join: {
        from: this.joinFrom,
        to: this.joinTo,
      },
    });
  }

  get joinTo() {
    return `${this.related.tableName}.${this.id}`;
  }
}
