import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma.service';
import IUpdateUser, { IUser } from './userDto/userDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    
    async getAll(): Promise<any>{
        const users = await this.prisma.user.findMany({select: {
            id: true,
            name: true,
            email: true,
            role:true,
        }});
        return users
    }

    async createUser(data: IUser): Promise<any>{        
        const hashedPass = await bcrypt.hash(data.password,12)
        const user = await this.prisma.user.create({ data:{
            ...data,
            password:hashedPass
        }, select: {
            id: true,
            name: true,
            email: true,
            role:true,
        }
        })
        return user;
    }

    async getOne(id: string): Promise<any>{
        const user = await this.prisma.user.findFirst({
            where: {
            id:Number(id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                role:true,
            }
        })
        return user;
    }

    async updateUser(id:string,data:IUpdateUser) {
        const user = await this.prisma.user.update({
            where: {
                id: Number(id)
            }, data,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });
        return user
    }

    async deleteUser(id:string) {
        const user = await this.prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        return {
            status:"success",
            message:"User muvaffaqiyatli o'chirildi"
        };
    }
}
