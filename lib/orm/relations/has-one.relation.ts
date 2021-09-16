import { HasOneOptions } from '../../interfaces';
import { ModelClass } from '../../types';
import { Model } from '../model';
import { Relation } from './relation';

export class HasOneRelation extends Relation<HasOneOptions> {
  getRelation() {
    return this.createRelation({
      relation: Model.HasOneRelation,
      join: {
        from: this.joinFrom,
        to: this.joinTo,
      },
    });
  }
}
