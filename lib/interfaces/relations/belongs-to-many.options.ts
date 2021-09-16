import { BaseRelationOptions } from "./base-relation.options";

export interface BelongsToManyOptions extends BaseRelationOptions {
  /** Intermediate table */
  table?: string;
}