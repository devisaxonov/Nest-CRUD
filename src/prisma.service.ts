import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

class PrismaService extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
        await this.$connect()
    }
}

export default PrismaService;