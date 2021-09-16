import { Model } from "../model";
import Objection, { RelationMapping } from "objection";
import { ModelClass } from "../../types";
import { BaseRelationOptions } from '../../interfaces';
import { objExcept, toSnakeCase, pluralize } from "../../utils";
import merge from 'lodash.merge';

export abstract class Relation<O extends BaseRelationOptions> {
    options?: O;

    targetClass: Model;
    relatedClass: ModelClass;

    protected inverse: boolean = false;

    constructor(target: Model, related: ModelClass, options?: O) {
        this.options = options;
        this.targetClass = target;
        this.relatedClass = related;
    }

    get target(): Objection.ModelClass<any> {
        return this.targetClass.$modelClass
    }

    get related(): Objection.ModelClass<any> {
        return (this.relatedClass() as any)
    }

    abstract getRelation(): RelationMapping<any>;

    protected createRelation(data: Omit<RelationMapping<any>, 'modelClass'>): RelationMapping<any> {
        const exclude = ['as', 'through', 'type', 'morphName', 'id', 'typeValue']; //possible options across relation

        const relation: any = {
            modelClass: this.relatedClass,
            ...merge(data, objExcept(this.options, exclude))
        };

        return relation;
    }

    prepareOptions?(): any

    /** Default join.from */
    get joinFrom() {
        const column = this.inverse ? `${toSnakeCase(this.related.name)}_id` : 'id';

        return `${this.target.tableName}.${column}`
    }

    /** Default join.to */
    get joinTo() {
        const column = this.inverse ? 'id' : `${toSnakeCase(this.target.name)}_id` ;

        return `${this.related.tableName}.${column}`;
    }

    getSingularKey(name: string) {
        return pluralize.singular(toSnakeCase(name)).toLowerCase()
    }

    getPluralKey(name: string) {
        return pluralize.plural(toSnakeCase(name)).toLowerCase();
    }
}