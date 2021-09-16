import { RelationMapping } from 'objection';
import { HasManyOptions } from '../../interfaces';
import { Relation } from './relation';

export class HasManyRelation extends Relation<HasManyOptions> {
  getRelation(): RelationMapping<any> {
    return this.createRelation({
      relation: this.target.HasManyRelation,
      join: {
        from: this.joinFrom,
        to: this.joinTo,
      },
    });
  }
}
