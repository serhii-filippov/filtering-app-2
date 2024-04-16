import {Adapter, Get, Mapping, Query} from "@tsclean/core";
import {GET_USERS_SERVICE, IGetUsersService} from "@/domain/use-cases/get-users-service";
import {Auth} from "@/infrastructure/helpers/auth";

@Mapping('api/v1/get-users')
export class GetUsersController {

    constructor(
        @Adapter(GET_USERS_SERVICE) private readonly getUsersService: IGetUsersService
    ) {
    }

    @Get()
    // @Auth(["admin", "guest"])
    async getUsersController(@Query() params: { [key: string]: string | number }): Promise<any> {
        Object.keys(params).forEach((key) => {
            if (key in QueryStringParamsToCastToInteger)
                params[key] = Number(params[key])
        })

        return this.getUsersService.getUsersByParams(params)
    }
}

enum QueryStringParamsToCastToInteger {
    page = 'page',
    limit = 'limit',
    sort = 'sort',
}