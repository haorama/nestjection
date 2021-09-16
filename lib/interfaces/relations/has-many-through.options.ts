import { ModelClass } from '../../types';
import { BaseRelationOptions } from "./base-relation.options";

export interface HasManyThroughOptions extends BaseRelationOptions {
  through?: ModelClass;
}