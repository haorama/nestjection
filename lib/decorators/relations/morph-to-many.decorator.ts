import { MorphToManyOptions, MorphToManyRelation } from "../..";
import { addRelation } from "../../storages/relation.storage";
import { ModelClass } from "../../types";

export function MorphToMany(modelClass: ModelClass, morphName: string): PropertyDecorator;
export function MorphToMany(modelClass: ModelClass, options: MorphToManyOptions): PropertyDecorator;
export function MorphToMany(modelClass: ModelClass, arg: string | MorphToManyOptions): PropertyDecorator {
    return (target: any, propertyKey) => {
        let options: MorphToManyOptions = {} as any;

        if (typeof arg === 'string') {
            options.morphName = arg;
        } else {
            options = arg;
        }

        if (!options.as) options.as = propertyKey;

        addRelation(target, new MorphToManyRelation(target, modelClass, options))
    }
}