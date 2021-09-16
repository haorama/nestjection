import { BaseRelationOptions } from "../";

// Base Polymorphic relation options
export interface MorphOptions extends BaseRelationOptions {
    morphName: string;
    id?: string;

    /** Type Column */
    type?: string;

    /** type value */
    typeValue?: string;
}