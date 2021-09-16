import { AnyModelConstructor, ModelClassFactory, Modifier, QueryBuilderType, RelationJoin, RelationMappingHook } from "objection";
import { ModelClass } from "../../types";

/**
 * All relation mapping from objection are optional so everything is partial
 * For now no relation and modelClass from relation mapping
 */
export interface BaseRelationOptions {
  as?: string;
  join?: Partial<RelationJoin>
  modify?: ModelClassFactory | AnyModelConstructor | string;
  filter?: Modifier<QueryBuilderType<any>>
  beforeInsert?: RelationMappingHook<any>
}

// Base Polymorphic relation options
export interface MorphOptions extends BaseRelationOptions {
  morphName: string;
  id?: string;

  /** Type Column */
  type?: string;

  /** type value */
  typeValue?: string;
}

export interface BelongsToOptions extends BaseRelationOptions {}

export interface BelongsToManyOptions extends BaseRelationOptions {
  /** Intermediate table */
  table?: string;
}

export interface HasManyThroughOptions extends BaseRelationOptions {
  through?: ModelClass;
}

export interface MorphManyOptions extends MorphOptions {}

export interface HasManyOptions extends BaseRelationOptions {}

export interface HasOneOptions extends BaseRelationOptions {}

export interface MorphOneOptions extends MorphOptions {}

export interface MorphToManyOptions extends MorphOptions {
  table?: string;
}

export interface MorphToOptions extends MorphOptions {}