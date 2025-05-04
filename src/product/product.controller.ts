import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { IProduct, IUpdateProduct } from "./productDto/productDto";
import { IUpdateCategory } from "src/category/categoryDto/categoryDto";

@Controller('product')
export class ProductController{
    constructor(private readonly productService: ProductService) { }
    
    @HttpCode(200)
    @Get()
    async getAll() {
        return await this.productService.getAll()
    }

    @HttpCode(201)
    @Post()
    async createProduct(@Body() data:IProduct): Promise<any>{
        return await this.productService.createProduct(data);
    }

    @HttpCode(200)
    @Put(":id")
    async updateProduct(@Param("id") id: string, @Body() data: IUpdateProduct):Promise<any> {
        return await this.productService.updateProduct(id, data);
    }

    @HttpCode(200)
    @Delete(":id")
    async deleteProduct(@Param("id") id: string):Promise<any> {
        return await this.productService.deleteProduct(id)
    }

}

