import { RelationFilterOptions } from "./relation-filter.options";

export interface BelongsToOptions extends RelationFilterOptions {
    foreignKey?: string;
    ownerKey?: string,
}