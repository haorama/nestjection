import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { User } from "./user.model";
import { ModelSerializerInterceptor } from '../../../src/interceptors';
import { Restaurant } from "./restaurant.model";

@Controller('api/users')
@UseInterceptors(ModelSerializerInterceptor)
export class UserController {
    @Get()
    async index() {
        // return await User.query().withGraphFetched('roles')

        const restaurant = await Restaurant.query().first();

        return await restaurant.$relatedQuery('stripe').insert({
            type: 'custom',
            account_id: 'as'
        })
    }
}