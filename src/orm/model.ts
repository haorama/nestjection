import { TableConvention } from '@/unions';
import { getModelTableConvention } from '@/utils';
import { Model as ObjectionModel } from 'objection';
import { QueryBuilder } from './query-builder';

export class Model extends ObjectionModel {
    QueryBuilderType!: QueryBuilder<this>;

    static tableConvention?: TableConvention = 'snake_case_plural';

    /** Extender Query builder */
    static get QueryBuilder() {
        return QueryBuilder;
    }

    /** Table naming convention, default using snake case plural */
    static get tableName() {
        return getModelTableConvention(this.tableConvention, this.name)
    }

    /** Set this to true if you want to implement soft delete, In progress */
    static get useSoftDelete() {
        return false;
    }
}