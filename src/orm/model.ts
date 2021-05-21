import { TableConvention } from '@/unions';
import { getModelTableConvention } from '@/utils';
import { Model as ObjectionModel } from 'objection';
import { QueryBuilder } from './query-builder';

export class Model extends ObjectionModel {
    QueryBuilderType!: QueryBuilder<this>;

    static tableConvention?: TableConvention = 'snake_case_plural';

    static get QueryBuilder() {
        return QueryBuilder;
    }

    static get tableName() {
        return getModelTableConvention(this.tableConvention, this.name)
    }
}