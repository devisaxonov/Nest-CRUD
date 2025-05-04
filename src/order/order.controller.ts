import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { IOrder } from "./orderDto/orderdto";

@Controller('order')
export class OrderController{
    constructor(private orderService: OrderService) { }
    
    @HttpCode(201)
    @Post()
    async createOrder(@Body() data:IOrder): Promise<any>{
        return await this.orderService.createOrder(data);
    }
}