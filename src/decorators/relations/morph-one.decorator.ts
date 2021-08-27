import { MorphOneOptions } from "../../interfaces";
import { MorphOneRelation } from "../../orm";
import { addRelation } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function MorphOne(modelClass: ModelClass, morphName: string): Function;
export function MorphOne(modelClass: ModelClass, options: MorphOneOptions): Function;

export function MorphOne(modelClass: ModelClass, morphNameOrOptions: string | MorphOneOptions): Function {
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