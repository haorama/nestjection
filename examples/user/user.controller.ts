import { ModelSerializerInterceptor } from "@/interceptors";
import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
@UseInterceptors(ModelSerializerInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async index() {
        return await this.userService.getAll();
    }
}