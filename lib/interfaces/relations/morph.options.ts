// Base Polymorphic relation options
export interface MorphOptions {
    morphName: string;
    id?: string;

    /** Type Column */
    type?: string;

    /** type value */
    typeValue?: string;
}