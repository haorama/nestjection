import { HasOneOptions } from "../../options";
import { HasOneRelation } from "../../orm";
import { addRelation, getPreparedRelationOptions } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function HasOne( modelClass: ModelClass, options?: HasOneOptions): Function {
    return (target: any, propertyName: string) => {
        const hasOneOptions: HasOneOptions = getPreparedRelationOptions(options);

        if (!hasOneOptions.as) hasOneOptions.as = propertyName;

        addRelation(target, new HasOneRelation(target.constructor, modelClass, hasOneOptions));
    };
}