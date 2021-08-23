import { BelongsToOptions } from "../../interfaces";
import { BelongsToRelation } from "../../orm";
import { addRelation, getPreparedRelationOptions } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function BelongsTo(modelClass: ModelClass, options?: BelongsToOptions): Function {
    return (target: any, propertyName: string) => {
        const belongsToOptions: BelongsToOptions = getPreparedRelationOptions(options);

        if (!belongsToOptions.as) belongsToOptions.as = propertyName;

        addRelation(target, new BelongsToRelation(target, modelClass, belongsToOptions));
    }
}