import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { User } from "./user.model";
import { ModelSerializerInterceptor } from '../../../src/interceptors';

@Controller('api/users')
@UseInterceptors(ModelSerializerInterceptor)
export class UserController {
    @Get()
    async index() {
        return await User.query().withGraphFetched('restaurants')
    }
}