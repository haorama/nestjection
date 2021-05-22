import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ModelSerializerInterceptor } from "src";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Controller('user')
@UseInterceptors(ModelSerializerInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async index() {
        return await this.userService.getAll();
    }

    @Get('wow')
    async user() {
        const user = new User({email: 'wow'})

        return user;
    }
}