export interface IProduct{
    name: string,
    description?: string,
    price: number,
    categoryId: number,
}

export interface IUpdateProduct{
    name?: string,
    description?: string,
    price?: number,
    categoryId?: number,
}