import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { User } from "./user.model";
import { ModelSerializerInterceptor } from '../../../src/interceptors';
import { Restaurant } from "./restaurant.model";

@Controller('api/users')
@UseInterceptors(ModelSerializerInterceptor)
export class UserController {
    @Get()
    async index() {
        // return await User.query().withGraphFetched('stripe')

        return await Restaurant.query().withGraphFetched('stripe')
    }
}