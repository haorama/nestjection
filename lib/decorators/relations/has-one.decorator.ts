import { HasOneOptions } from "../../interfaces";
import { HasOneRelation } from "../../orm";
import { addRelation, getPreparedRelationOptions } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function HasOne(modelClass: ModelClass, options?: HasOneOptions): PropertyDecorator {
    return (target: any, propertyKey: string) => {
        const hasOneOptions: HasOneOptions = getPreparedRelationOptions(options);

        if (!hasOneOptions.as) hasOneOptions.as = propertyKey;

        addRelation(target, new HasOneRelation(target, modelClass, hasOneOptions));
    };
}