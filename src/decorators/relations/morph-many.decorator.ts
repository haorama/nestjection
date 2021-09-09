import { MorphManyOptions, MorphManyRelation } from "../..";
import { addRelation } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function MorphMany(modelClass: ModelClass, morphName: string): PropertyDecorator;
export function MorphMany(modelClass: ModelClass, options: MorphManyOptions): PropertyDecorator;
export function MorphMany(modelClass: ModelClass, arg: string | MorphManyOptions): PropertyDecorator {
    return (target: any, propertyKey) => {
        let morphManyOptions: MorphManyOptions;

        if (typeof arg === 'string') {
            morphManyOptions.morphName = arg
        } else {
            morphManyOptions = arg;
        }

        if (!morphManyOptions.as) morphManyOptions.as = propertyKey;

        addRelation(target, new MorphManyRelation(target, modelClass, morphManyOptions))
    }
}