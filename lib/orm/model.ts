import { Model as ObjectionModel, Pojo } from 'objection';
import { getRelations } from '../storages/relation.storage';
import { castValue, objExcept } from '../utils';
import { QueryBuilder } from './query-builder';

export class Model extends ObjectionModel {
    QueryBuilderType: QueryBuilder<this>;
    static QueryBuilder = QueryBuilder

    static booted = false;
    static connection?: string;

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

    /** Serialize the excluded property */
    serialize() {
        return objExcept(this, (<typeof Model>this.constructor).hiddenFields);
    }

    $parseDatabaseJson(json: Pojo) {
        json = super.$parseDatabaseJson(json);

        if (this.casts()) {
            const casts = this.casts();

            for (const [key, value] of Object.entries(casts)) {
                json[key] = castValue(json[key], value);
            }
        }

        return json;
    }

    static boot() {
        this.booted = true;

        const model = new this();

        this.prepareModel(model);
    }

    private static prepareModel(model: Model) {
        this.setRelations(model);
    }

    private static setRelations(model: Model) {
        const relations = getRelations(model)

        if (!relations || !relations.length) {
            return null;
        }

        let mappings: any = {};

        if (this.relationMappings && typeof this.relationMappings === 'function') {
            mappings = {...this.relationMappings()}
        }

        relations.map(relation => {
            mappings[relation.options.as] = relation.getRelation();
        })

        this.relationMappings = () => mappings;
    }
}