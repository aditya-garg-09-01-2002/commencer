import { PrismaClient } from "@prisma/client"

export const database = new PrismaClient({
    log:
        // isDevelopment()?["query"]:
        [],
})