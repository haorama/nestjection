import { HasManyOptions } from "../../interfaces";
import { HasManyRelation } from "../../orm";
import { addRelation, getPreparedRelationOptions } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function HasMany(modelClass: ModelClass, options?: HasManyOptions): Function {
    return (target: any, propertyKey: string) => {
        const hasManyOptions: HasManyOptions = getPreparedRelationOptions(options);

        if (!hasManyOptions.as) hasManyOptions.as = propertyKey;

        addRelation(target, new HasManyRelation(target, modelClass, hasManyOptions));
    };
}