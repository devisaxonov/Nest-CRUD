import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { ICategory, IUpdateCategory } from "./categoryDto/categoryDto";

@Controller("category")

export class CategoryController{
    constructor(private readonly categoryService: CategoryService) { }
    
    @HttpCode(200)
    @Get()
    async getAll(): Promise<any>{
        return await this.categoryService.getAll()
    }

    @HttpCode(201)
    @Post()
    async createCategory(@Body() data:ICategory):Promise<any> {
        return this.categoryService.createCategory(data)
    }

    @HttpCode(200)
    @Put(":id")
    async updateCategory(@Param("id") id: string, @Body() data: IUpdateCategory):Promise<any> {
        return await this.categoryService.updateCategory(id, data);
    }

    @HttpCode(200)
    @Delete(":id")
    async deleteCategory(@Param("id") id: string):Promise<any> {
        return await this.categoryService.deleteCategory(id);
    }

}