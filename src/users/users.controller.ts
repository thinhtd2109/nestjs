import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) {}
    @Post('/signup')
    createUser(@Body() body : CreateUserDto) {
        return this.userService.create(body.email, body.password);
    }
    @Get()
    getListUsers() {
        return this.userService.find();
    }

    @Get('/:id')
    getUser(@Param() param) {
        return this.userService.findOne(param.id);
    }

    @Delete('/:id') 
    deleteUser(@Param() param) {
        return this.userService.delete(param.id)
    }

    @Put('/:id') 
    updateUser(@Param() param, @Body() body) {
        return this.userService.update(param.id, body);
    }
}
