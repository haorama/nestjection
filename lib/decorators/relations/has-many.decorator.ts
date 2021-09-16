import { HasManyOptions } from "../../interfaces";
import { HasManyRelation } from "../../orm";
import { addRelation, getPreparedRelationOptions } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function HasMany(modelClass: ModelClass, options?: HasManyOptions): PropertyDecorator {
    return (target: any, key: string) => {
        const hasManyOptions: HasManyOptions = getPreparedRelationOptions(key, options);

        addRelation(target, new HasManyRelation(target, modelClass, hasManyOptions));
    };
}