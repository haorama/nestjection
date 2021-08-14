import Objection,{ RelationMapping } from "objection";
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

    protected inverse: boolean = false;

    constructor(target: Model, relatedClass: ModelClass) {
        this.target = target;
        this.relatedClass = relatedClass;
    }

    setForeignKey(foreignKey?: string) {
        this.foreignKey = foreignKey ?? this.getDefaultFK()
    }

    setOwnerKey(ownerKey?: string) {
        this.ownerKey = ownerKey ?? 'id';
    }

    setLocalKey(localKey?: string) {
        this.localKey = localKey ?? 'id';
    }

    abstract getRelation(): RelationMapping<any>

    get getTarget(): Objection.ModelClass<any> {
        return this.target.$modelClass
    }

    get getRelated(): Objection.ModelClass<any> {
        return (this.relatedClass() as any)
    }

    getDefaultFK() {
        if (this.getRelated) {
            if (this.inverse) {
                return `${toSnakeCase(this.getRelated.name)}_id`
            }

            return `${toSnakeCase(this.getTarget.name)}_id`
        }
    }
}