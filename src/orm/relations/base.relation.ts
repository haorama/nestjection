import { toSnakeCase } from "../../utils";
import { Model } from "../model";

export abstract class BaseRelation {
    target: typeof Model;
    relatedClass: typeof Model;

    foreignKey?: string;

    localKey?: string;

    ownerKey?: string;

    constructor(target: typeof Model, relatedClass: typeof Model) {
        this.target = target;
        this.relatedClass = relatedClass;
    }

    setForeignKey(foreignKey?: string) {
        this.foreignKey = foreignKey ?? `${toSnakeCase(this.relatedClass.name)}_id`;
    }

    setOwnerKey(ownerKey?: string) {
        this.ownerKey = ownerKey ?? 'id';
    }

    setLocalKey(localKey?: string) {
        this.localKey = localKey ?? 'id';
    }
}