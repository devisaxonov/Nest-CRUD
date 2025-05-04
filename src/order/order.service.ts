import { Injectable } from "@nestjs/common";
import PrismaService from "src/prisma.service";
import { IOrder } from "./orderDto/orderdto";
import { IProduct } from "src/product/productDto/productDto";

@Injectable()
export class OrderService{
    constructor(private readonly prisma: PrismaService) { }
    
    async createOrder(data:IOrder): Promise<any>{
        return this.prisma.$transaction(async (prisma) => {
            const order = await prisma.order.create({
                data: {
                    userId: data.order.userId,
                    totalPrice: 0
                }
            });

            let totalPrice:number = 0
            for (let i of data.orderProducts) {
                await prisma.orderProduct.create({data:{
                    ...i,
                    orderId: order.id
                }
                })
                
                const product = await prisma.product.findFirst({
                    where: {
                    id:i.productId
                    }
                })
                
                totalPrice += Number(product?.price)  * i.quantity
            }

            const updatedOrder = await prisma.order.update({
                where: {
                    id: order.id
                },
                data: { totalPrice },
                select: {
                    id: true,
                    users: {
                        select: {
                            id: true,
                            name: true,
                            email:true
                        }
                    },
                    totalPrice: true,
                    products: true
                }
            });

            return updatedOrder
        })
    }
}