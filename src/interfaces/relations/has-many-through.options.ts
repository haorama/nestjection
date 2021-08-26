import { Model } from "../../orm";
import { BaseRelationOptions } from "./base-relation.options";
import { RelationFilterOptions } from "./relation-filter.options";

export interface HasManyThroughOptions extends RelationFilterOptions, BaseRelationOptions {
    /** Through table name */
    through: string | typeof Model;

    /** local key on model table */
    from?: string;

    /** foreign key on related table */
    to?: string;

    /** local key on through table */
    throughFrom?: string;

    /** foreign key on the through table */
    throughTo?: string;
}