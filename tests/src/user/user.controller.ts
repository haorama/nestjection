import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { User } from "./user.model";
import { ModelSerializerInterceptor } from '../../../src/interceptors';
import { getRelations } from "../../../src/storages/relation.storage";
import { Otp } from "./otp.model";

@Controller('api/users')
@UseInterceptors(ModelSerializerInterceptor)
export class UserController {
    @Get()
    async index() {
        return await User.query();
    }
}