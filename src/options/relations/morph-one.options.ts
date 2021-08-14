import { HasOneOptions } from "./has-one.options";

export interface MorphOneOptions extends HasOneOptions {
    morphName: string;
    id?: string;

    /** Type Column */
    type?: string;

    /** type value */
    typeValue?: string;
}