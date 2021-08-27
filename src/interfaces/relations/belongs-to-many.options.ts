import { BaseRelationOptions } from "./base-relation.options";

export interface BelongsToManyOptions extends BaseRelationOptions {
    /** Intermediate table */
    pivotTable?: string;

    /** foreign key for model table */
    throughFrom?: string;

    /** foreign key for related table*/
    throughTo?: string;
}