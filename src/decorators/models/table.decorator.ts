import { TableOptions } from "../../interfaces";
import { addModel, getPrepareModelOptions } from "../../storages/model.storage";

export function Table(name?: string): ClassDecorator;
export function Table(options?: TableOptions): ClassDecorator;
export function Table(nameOrOptions?: string | TableOptions): ClassDecorator {
    return (target: any) => {
        let tableOptions = getPrepareModelOptions(target, nameOrOptions)

        target.tableName = tableOptions.name;

        addModel(target, tableOptions)
    }
}