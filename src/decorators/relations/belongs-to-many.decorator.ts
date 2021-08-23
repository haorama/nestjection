import { BelongsToManyOptions } from "../../interfaces";
import { BelongsToManyRelation } from "../../orm";
import { addRelation, getPreparedRelationOptions } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function BelongsToMany(modelClass: ModelClass, options?: BelongsToManyOptions): Function {
    return (target: any, propertyName) => {
        const belongsToManyOptions: BelongsToManyOptions = getPreparedRelationOptions(options);

        if (!belongsToManyOptions.as) belongsToManyOptions.as = propertyName;

        addRelation(target, new BelongsToManyRelation(target, modelClass, belongsToManyOptions));
    }
}