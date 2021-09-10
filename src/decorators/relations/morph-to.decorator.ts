import { MorphToOptions } from "../../interfaces";
import { MorphToRelation } from "../../orm";
import { addRelation } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function MorphTo(related: ModelClass, options?: MorphToOptions): PropertyDecorator {
    return (target: any, propertyKey: string) => {
        const morphToOptions: MorphToOptions = {...options} as any;

        if (!morphToOptions.as) morphToOptions.as = propertyKey;

        addRelation(target, new MorphToRelation(target, related, morphToOptions))
    }
}