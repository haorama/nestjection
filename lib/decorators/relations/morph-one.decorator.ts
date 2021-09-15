import { MorphOneOptions } from "../../interfaces";
import { MorphOneRelation } from "../../orm";
import { addRelation } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function MorphOne(modelClass: ModelClass, morphName: string): PropertyDecorator;
export function MorphOne(modelClass: ModelClass, options: MorphOneOptions): PropertyDecorator;

export function MorphOne(modelClass: ModelClass, morphNameOrOptions: string | MorphOneOptions): PropertyDecorator {
    return (target: any, propertyKey: string) => {
        let morphOneOptions: any = {};

        if (typeof morphNameOrOptions === 'string') {
            morphOneOptions.morphName = morphNameOrOptions;
        } else {
            morphOneOptions = morphNameOrOptions;
        }

        if (!morphOneOptions.as) morphOneOptions.as = propertyKey;

        addRelation(target, new MorphOneRelation(target, modelClass, morphOneOptions))
    }
}