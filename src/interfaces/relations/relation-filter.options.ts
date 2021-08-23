import { QueryBuilder } from "objection";

export interface RelationFilterOptions {
    filter?: (query: QueryBuilder<any>) => void
}