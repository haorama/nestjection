import { AnyModelConstructor, ModelClassFactory, Modifier, QueryBuilderType, RelationJoin, RelationMappingHook } from "objection";

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