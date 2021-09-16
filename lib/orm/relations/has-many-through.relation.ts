import { toSnakeCase } from '../../utils';
import { HasManyThroughOptions } from "../../interfaces";
import { Model } from "../model";
import { Relation } from "./relation";
import Objection from 'objection';

export class HasManyThroughRelation extends Relation<HasManyThroughOptions> {
  getRelation() {
    return this.createRelation({
      relation: Model.ManyToManyRelation,
      join: {
        from: this.joinFrom,
        to: this.joinTo,
        through: this.joinThrough
      }
    })
  }

  get throughClass() {
    return this.options?.through ?
      (this.options.through() as unknown as Objection.ModelClass<any>) : null;
  }

  get joinTo() {
    return this.throughClass ?
      `${this.related.tableName}.${toSnakeCase(this.throughClass.name)}_id`
      : super.joinTo
  }

  /** Default join through if through class defined */
  get joinThrough(): Objection.RelationThrough<any> {
    const fromKey = `${this.getSingularKey(this.target.name)}_id`;

    return {
      from: `${this.throughClass.tableName}.${fromKey}`,
      to: `${this.throughClass.tableName}.id`
    }
  }
}