import {
  AnyModelConstructor,
  ModelClassFactory,
  Modifier,
  QueryBuilderType,
  RelationMappingHook,
  RelationThrough,
  RelationMappingColumnRef,
} from 'objection';
import { ModelClass } from '../../types';

interface RelationJoin {
  from: RelationMappingColumnRef;
  to: RelationMappingColumnRef;
  through?: Partial<RelationThrough<any>>;
}

/**
 * All relation mapping from objection are optional so everything is partial
 * For now no relation and modelClass from relation mapping
 */
export interface BaseRelationOptions {
  as?: string;
  join?: Partial<RelationJoin>;
  modify?: ModelClassFactory | AnyModelConstructor | string;
  filter?: Modifier<QueryBuilderType<any>>;
  beforeInsert?: RelationMappingHook<any>;
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

export type BelongsToOptions = BaseRelationOptions;

export interface BelongsToManyOptions extends BaseRelationOptions {
  /** Intermediate table */
  table?: string;
}

export interface HasManyThroughOptions extends BaseRelationOptions {
  through?: ModelClass;
}

export type MorphManyOptions = MorphOptions;

export type HasManyOptions = BaseRelationOptions;

export type HasOneOptions = BaseRelationOptions;

export type MorphOneOptions = MorphOptions;

export interface MorphToManyOptions extends MorphOptions {
  table?: string;
}

export type MorphToOptions = MorphOptions;
