import { RelationFilterOptions } from "./relation-filter.options";

export interface HasOneOptions extends RelationFilterOptions {
    foreignKey?: string;
    localKey?: string;
}