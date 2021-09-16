import { MorphManyOptions, MorphManyRelation } from "../..";
import { addRelation } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function MorphMany(modelClass: ModelClass, morphName: string): PropertyDecorator;
export function MorphMany(modelClass: ModelClass, options: MorphManyOptions): PropertyDecorator;
export function MorphMany(modelClass: ModelClass, arg: string | MorphManyOptions): PropertyDecorator {
    return (target: any, key: string) => {
        let morphManyOptions: MorphManyOptions = {} as any;

        if (typeof arg === 'string') {
            morphManyOptions.morphName = arg
        } else {
            morphManyOptions = arg;
        }

        if (!morphManyOptions.as) morphManyOptions.as = key;

        addRelation(target, new MorphManyRelation(target, modelClass, morphManyOptions))
    }
}