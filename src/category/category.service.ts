import { Injectable } from "@nestjs/common";
import PrismaService from "src/prisma.service";
import { ICategory, IUpdateCategory } from "./categoryDto/categoryDto";

@Injectable()
export class CategoryService{
    constructor(private prisma: PrismaService) { }
    
    async getAll():Promise<any> {
        const categories = await this.prisma.category.findMany();
        return categories
    }

    async createCategory(data:ICategory):Promise<any> {
        const category = await this.prisma.category.create({ data })
        return category
    }

    async updateCategory(id: string,data:IUpdateCategory):Promise<any> {
        const updated = await this.prisma.category.update({
            where: {
                id: Number(id),
            }, data
        })
        return updated;
    }

    async deleteCategory(id:string):Promise<any> {
        await this.prisma.category.delete({
            where: {
            id:Number(id)
            }
        })
        return {
            status:"success",
            message:"Muvaffaqiyatli o'chirildi"
        }
    }
}