import { BaseRelationOptions } from "./base-relation.options";

export interface BelongsToManyOptions extends BaseRelationOptions {
    /** Intermediate table */
    table?: string;

    /** foreign key for model table */
    parentFK?: string;

    /** foreign key for related table*/
    relatedFK?: string;
}