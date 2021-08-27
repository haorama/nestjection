import { MorphToOptions } from "../../interfaces";
import { Model, MorphToRelation } from "../../orm";
import { addRelation, getPreparedRelationOptions } from "../../storages/relation.storage";

/** Incomplete */
export function MorphTo(morphs: typeof Model[], options?: MorphToOptions): PropertyDecorator {
    return (target: any, propertyKey: string) => {
        const morphToOptions: MorphToOptions = getPreparedRelationOptions(options);

        if (!morphToOptions.as) morphToOptions.as = propertyKey;

        addRelation(target, new MorphToRelation(target, morphs, morphToOptions))
    }
}