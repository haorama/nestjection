import { BaseRelationOptions } from "./base-relation.options";

export interface BelongsToOptions extends BaseRelationOptions {
    foreignKey?: string;
    ownerKey?: string,
}