import { HasManyThroughOptions } from '../../interfaces';
import { HasManyThroughRelation } from '../../orm';
import { addRelation } from '../../storages/relation.storage';
import { ModelClass } from '../../types';

export function HasManyThrough(
  modelClass: ModelClass,
  through: ModelClass,
): PropertyDecorator;
export function HasManyThrough(
  modelClass: ModelClass,
  options: HasManyThroughOptions,
): PropertyDecorator;
export function HasManyThrough(
  modelClass: ModelClass,
  arg: ModelClass | HasManyThroughOptions,
): PropertyDecorator {
  return (target: any, key: string) => {
    let options: HasManyThroughOptions = {};

    if (typeof arg === 'object') {
      options = arg;
    } else {
      options.through = arg;
    }

    options.as = key;

    addRelation(
      target,
      new HasManyThroughRelation(target, modelClass, options),
    );
  };
}
