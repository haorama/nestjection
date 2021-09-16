import { BelongsToOptions } from "../../interfaces";
import { Model } from "../model";
import { Relation } from "./relation";

export class BelongsToRelation extends Relation<BelongsToOptions> {
    protected inverse = true;

    getRelation() {
        return this.createRelation({
            relation: Model.BelongsToOneRelation,
            join: {
                from: this.joinFrom,
                to: this.joinTo,
            }
        })
    }
}