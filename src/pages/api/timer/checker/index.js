import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST({request}) {

    const body = await request.json()

    const user = await prisma.user.findFirst({
        where: {
            email: body.email,
        },
    })

    prisma.$disconnect()

    return Response.json({message: "Success", started: user.started})
}