import { TableConvention } from '@/unions';
import { getModelTableConvention } from '@/utils';
import { Model as ObjectionModel } from 'objection';

export class Model extends ObjectionModel {
    static tableConvention?: TableConvention = 'snake_case_plural';

    static get tableName() {
        return getModelTableConvention(this.tableConvention, this.name)
    }
}