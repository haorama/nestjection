import { BelongsToManyOptions } from "../../interfaces";
import { BelongsToManyRelation } from "../../orm";
import { addRelation, getPreparedRelationOptions } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function BelongsToMany(modelClass: ModelClass, table?: string): PropertyDecorator;
export function BelongsToMany(modelClass: ModelClass, options?: BelongsToManyOptions): PropertyDecorator;
export function BelongsToMany(modelClass: ModelClass, args?: string | BelongsToManyOptions): PropertyDecorator {
    return (target: any, key: string) => {
        let options: BelongsToManyOptions = {};

        if (typeof args == 'string') {
            options = getPreparedRelationOptions(key, {table: args})
        } else {
            options = getPreparedRelationOptions(key, args)
        }

        addRelation(target, new BelongsToManyRelation(target, modelClass, options));
    }
}