import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import IUpdateUser, { IUser } from './userDto/userDto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    @HttpCode(200)
    @Get()
    async getAll(): Promise<any>{
        return await this.userService.getAll();
    }

    @HttpCode(201)
    @Post()
    async createUser(@Body() data:IUser): Promise<any>{
        return await this.userService.createUser(data);
    }

    @HttpCode(200)
    @Get(":id")
    async getOne(@Param("id") id: string) {
        return await this.userService.getOne(id);
    }

    @HttpCode(200)
    @Put(":id")
    async updateUser(@Param("id") id:string,@Body() data:IUpdateUser) {
        return await this.userService.updateUser(id, data);
    }

    @HttpCode(200)
    @Delete(":id")
    async deleteUser(@Param("id") id: string) {
        return this.userService.deleteUser(id);
    }



}
