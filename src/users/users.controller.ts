import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService, private authService : AuthService) {}
    @Post('/signup')
    createUser(@Body() body : CreateUserDto) {
        return this.authService.signup(body.email, body.password);
    }
    
    @Post('/signin')
    signin(@Body() body: CreateUserDto) {
        return this.authService.signin(body.email, body.password);
    }
    @Get()
    getListUsers() {
        return this.userService.find();
    }

    @serialize(UserDto)
    @Get('/:id')
    getUser(@Param('id') id) {
        return this.userService.findOne(id);
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
