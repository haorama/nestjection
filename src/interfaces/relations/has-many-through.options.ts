import { Model } from "../../orm";
import { BaseRelationOptions } from "./base-relation.options";
import { RelationFilterOptions } from "./relation-filter.options";

export interface HasManyThroughOptions extends RelationFilterOptions, BaseRelationOptions {
    through: string | typeof Model;

    firstKey?: string;

    secondKey?: string;
}