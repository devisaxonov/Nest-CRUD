import { Injectable } from "@nestjs/common";
import PrismaService from "src/prisma.service";
import { IProduct, IUpdateProduct } from "./productDto/productDto";

@Injectable()
export class ProductService{
    constructor(private prisma: PrismaService) { }
    
    async getAll():Promise<any> {
        const products = this.prisma.product.findMany();
        return products;
    }

    async createProduct(data:IProduct): Promise<any>{
        const product = await this.prisma.product.create({ data });
        return product;
    }

    async updateProduct(id: string, data: IUpdateProduct):Promise<any> {
        const updated = await this.prisma.product.update({
            where: {
                id: Number(id)
            }, data
        });
        return updated;
    }

    async deleteProduct(id:string):Promise<any> {
        await this.prisma.product.delete({
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