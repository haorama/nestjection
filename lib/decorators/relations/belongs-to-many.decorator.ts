import { BelongsToManyOptions } from "../../interfaces";
import { BelongsToManyRelation } from "../../orm";
import { addRelation, getPreparedRelationOptions } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function BelongsToMany(modelClass: ModelClass, options?: BelongsToManyOptions): PropertyDecorator {
    return (target: any, propertyKey: string) => {
        const belongsToManyOptions: BelongsToManyOptions = getPreparedRelationOptions(options);

        if (!belongsToManyOptions.as) belongsToManyOptions.as = propertyKey;

        addRelation(target, new BelongsToManyRelation(target, modelClass, belongsToManyOptions));
    }
}