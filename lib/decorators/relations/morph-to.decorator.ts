import { MorphToOptions } from "../../interfaces";
import { MorphToRelation } from "../../orm";
import { addRelation } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function MorphTo(related: ModelClass, morphName: string): PropertyDecorator;
export function MorphTo(related: ModelClass, options: MorphToOptions): PropertyDecorator
export function MorphTo(related: ModelClass, arg: string | MorphToOptions): PropertyDecorator {
    return (target: any, propertyKey: string) => {
        let morphToOptions: MorphToOptions = {} as any;

        if (typeof arg === 'string') {
            morphToOptions.morphName = arg;
        } else {
            morphToOptions = arg;
        }

        if (!morphToOptions.as) morphToOptions.as = propertyKey;

        addRelation(target, new MorphToRelation(target, related, morphToOptions))
    }
}