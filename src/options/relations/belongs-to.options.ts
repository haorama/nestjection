import { BaseRelationOptions } from "./base-relation.options";
import { RelationFilterOptions } from "./relation-filter.options";

export interface BelongsToOptions extends RelationFilterOptions, BaseRelationOptions {
    foreignKey?: string;
    ownerKey?: string,
}