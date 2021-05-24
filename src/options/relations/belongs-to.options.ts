import { QueryBuilder } from "../../orm";

export interface BelongsToOptions {
    foreignKey?: string;
    ownerKey?: string,
    filter?: (query: QueryBuilder<any>) => void
}