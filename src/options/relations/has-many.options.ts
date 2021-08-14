import { BaseRelationOptions } from "./base-relation.options";

export interface HasManyOptions extends BaseRelationOptions {
    foreignKey?: string;
    localKey?: string;
}