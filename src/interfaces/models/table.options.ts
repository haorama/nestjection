import { TableConvention } from "../../types";

export interface TableOptions {
    name?: string;
    softDelete?: boolean;
    convention?: TableConvention;
}