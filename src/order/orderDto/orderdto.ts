export interface IOrder{
    order: {
        userId: number,
    }
    orderProducts:
        {
            productId: number,
            quantity: number
        }[]
}