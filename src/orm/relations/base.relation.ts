import { RelationMapping } from "objection";
import { BaseRelationOptions } from "../../options";
import { ModelClass } from "../../types";
import { toSnakeCase } from "../../utils";
import { Model } from "../model";

export abstract class BaseRelation<O extends BaseRelationOptions = any> {
    options?: O;

    target: Model;

    relatedClass: ModelClass;

    foreignKey?: string;

    localKey?: string;

    ownerKey?: string;

    constructor(target: Model, relatedClass: ModelClass) {
        this.target = target;
        this.relatedClass = relatedClass;
    }

    setForeignKey(foreignKey?: string) {
        // this.foreignKey = foreignKey ?? `${toSnakeCase(this.relatedClass().name)}_id`;
    }

    setOwnerKey(ownerKey?: string) {
        this.ownerKey = ownerKey ?? 'id';
    }

    setLocalKey(localKey?: string) {
        this.localKey = localKey ?? 'id';
    }

    abstract getRelation(): RelationMapping<any>

    get getTarget(): typeof Model {
        return this.target.constructor as any;
    }
}