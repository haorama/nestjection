import { BaseRelationOptions } from "./base-relation.options";
import { RelationFilterOptions } from "./relation-filter.options";

export interface HasOneOptions extends RelationFilterOptions, BaseRelationOptions {
    foreignKey?: string;
    localKey?: string;
}