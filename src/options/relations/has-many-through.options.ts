import { Model } from "../../orm";
import { RelationFilterOptions } from "./relation-filter.options";

export interface HasManyThroughOptions extends RelationFilterOptions {
    through: string | typeof Model;

    firstKey?: string;

    secondKey?: string;
}