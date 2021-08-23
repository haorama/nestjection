import { BaseRelationOptions } from "./base-relation.options";

export interface BelongsToManyOptions extends BaseRelationOptions {
    relatedTable?: string;
    foreignPivotKey?: string;
    relatedPivotKey?: string;
}