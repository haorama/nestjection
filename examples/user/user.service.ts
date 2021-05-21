import { Injectable } from "@nestjs/common";
import { User } from "./user.model";

@Injectable()
export class UserService {
    async getAll() {
        return await User.query();
    }
}