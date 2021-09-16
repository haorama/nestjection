import Objection, { RelationMapping } from 'objection';
import { BaseRelationOptions } from '../../interfaces';
import { ModelClass } from '../../types';
import { toSnakeCase } from '../../utils';
import { Model } from '../model';

/** @deprecated */
export abstract class BaseRelation<O extends BaseRelationOptions = any> {
  options?: O;

  targetClass: Model;

  relatedClass: ModelClass;

  foreignKey?: string;

  localKey?: string;

  ownerKey?: string;

  protected inverse = false;

  constructor(targetClass: Model, relatedClass: ModelClass) {
    this.targetClass = targetClass;
    this.relatedClass = relatedClass;
  }

  setForeignKey(foreignKey?: string) {
    this.foreignKey = foreignKey ?? this.getDefaultFK();
  }

  setOwnerKey(ownerKey?: string) {
    this.ownerKey = ownerKey ?? 'id';
  }

  setLocalKey(localKey?: string) {
    this.localKey = localKey ?? 'id';
  }

  abstract getRelation(): RelationMapping<any>;

  get target(): Objection.ModelClass<any> {
    return this.targetClass.$modelClass;
  }

  get related(): Objection.ModelClass<any> {
    return this.relatedClass() as any;
  }

  getDefaultFK() {
    if (this.related) {
      if (this.inverse) {
        return `${toSnakeCase(this.related.name)}_id`;
      }

      return `${toSnakeCase(this.target.name)}_id`;
    }
  }

  /** Merge relation with base options of relations */
  protected mergeRelation(data: RelationMapping<any>): RelationMapping<any> {
    const relation: any = {};

    if (this.options.filter) {
      relation.filter = this.options.filter;
    }

    return {
      ...relation,
      ...data,
    };
  }
}
