import { BaseRelationOptions } from "./base-relation.options";

export interface HasOneOptions extends BaseRelationOptions {
    foreignKey?: string;
    localKey?: string;
}