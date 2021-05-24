import 'reflect-metadata';
import { Model } from "objection";

export function HasOne(modelClass: () => typeof Model, options?: any): PropertyDecorator {
    return (target: object, key: any) => {
        console.log(target)
    }
}
