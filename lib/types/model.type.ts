import { Model } from '../orm';

export type ModelType = new () => Model;

export type PropertyCast = 'number' | 'float' | 'json' | 'string';

export type ModelClass = (returns?: void) => ModelType;
