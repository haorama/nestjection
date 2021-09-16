import { TableOptions } from '../../interfaces';
import { addModel, getPrepareModelOptions } from '../../storages/model.storage';

export function Table(name?: string): ClassDecorator;
export function Table(options?: TableOptions): ClassDecorator;
export function Table(nameOrOptions?: string | TableOptions): ClassDecorator {
  return (target: any) => {
    const tableOptions = getPrepareModelOptions(target, nameOrOptions);

    target.tableName = tableOptions.name;

    if (tableOptions.softDelete) {
      target.softDelete = tableOptions.softDelete
        ? 'deleted_at'
        : tableOptions.softDelete;
    }

    addModel(target, tableOptions);
  };
}
