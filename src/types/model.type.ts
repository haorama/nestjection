import { Model } from "../orm";

export type ModelType = new () => Model;

export type ModelCase = 'number' | 'float' | 'json' | 'string';

export type ModelClass = (returns?: void) => ModelType;