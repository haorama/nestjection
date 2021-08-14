import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { User } from "./user.model";
import { ModelSerializerInterceptor } from '../../../src/interceptors';
import { Otp } from "./otp.model";

@Controller('api/users')
@UseInterceptors(ModelSerializerInterceptor)
export class UserController {
    @Get()
    async index() {
        console.log((User.relationMappings as any)())
        console.log((Otp.relationMappings as any)())
        return await User.query()
    }
}