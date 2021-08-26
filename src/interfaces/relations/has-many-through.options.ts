import { Model } from "../../orm";
import { BaseRelationOptions } from "./base-relation.options";

export interface HasManyThroughOptions extends BaseRelationOptions {
    /** Through table name */
    through: string | typeof Model;

    /** local key on through table */
    throughFrom?: string;

    /** foreign key on the through table */
    throughTo?: string;
}