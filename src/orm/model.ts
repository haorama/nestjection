import { Model as ObjectionModel, Pojo } from 'objection';
import { TableConvention } from '../types';
import { getModelTableConvention, objExcept } from '../utils';
import { QueryBuilder } from './query-builder';
import { Relation } from './relations/relation';

export class Model extends ObjectionModel {
    QueryBuilderType!: QueryBuilder<this>;

    static booted = false;

    static tableConvention?: TableConvention = 'snake_case_plural';

    constructor(attrs: object = {}) {
        super();

        this.$set(attrs);
    }

    static get hiddenFields(): string[] {
        return [];
    }

    static useLimitInFirst = true;

    /** Exclude virtual / custom attributes to be save to database */
    exclude(): string[] {
        return [];
    }

    /** Casting attributes / properties */
    casts(): object {
        return {}
    }

    /** Extender Query builder */
    static get QueryBuilder() {
        return QueryBuilder;
    }

    /** Table naming convention, default using snake case plural */
    static get tableName() {
        return getModelTableConvention(this.tableConvention, this.name);
    }

    /** Set this to true if you want to implement soft delete, In progress */
    static get useSoftDelete(): boolean {
        return false;
    }

    /** Serialize the excluded property */
    serialize() {
        return objExcept(this, (<typeof Model>this.constructor).hiddenFields);
    }

    $parseDatabaseJson(json: Pojo) {
        json = super.$parseDatabaseJson(json);

        if (this.casts()) {
            const casts = this.casts();

            for (const [key, value] of Object.entries(casts)) {
                json[key] = value;
            }
        }

        return json;
    }

    static get relation() {
        return new Relation(this)
    }
}