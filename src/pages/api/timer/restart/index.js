import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST({request}) {

    const body = await request.json()

    const user = await prisma.user.update({
        where: {
            email: body.email,
        },
        data: {
            seconds: 0
        }
    })

    await prisma.log.create({
        data: {
            username: body.username,
            action: 3
        }
    })

    prisma.$disconnect()

    return Response.json({message: "Success", seconds: user.seconds})
}