import { Model } from "objection";

export type ModelType = new (
    values?: any,
    options?: any
  ) => typeof Model;

export type ModelCase = 'number' | 'float' | 'json' | 'string';

export type ModelClass = (returns?: void) => typeof Model;