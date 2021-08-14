import { BelongsToOptions } from "./belongs-to.options";

export interface MorphToOptions extends BelongsToOptions {
    type?: string;
}