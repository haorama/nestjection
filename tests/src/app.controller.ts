import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ModelSerializerInterceptor } from "../../src";
import { Blog } from "./blog.model";
import { User } from "./user.model";

@Controller()
export class AppController {
    @Get()
    @UseInterceptors(ModelSerializerInterceptor)
    async root() {
        const blog = await Blog.query().first().withGraphFetched('user');

        return blog;
    }
}