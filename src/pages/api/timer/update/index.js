import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST({request}) {

    const body = await request.json()

    const user = await prisma.user.update({
        where: {
            email: body.email,
        },
        data: {
            seconds: body.seconds
        }
    })

    prisma.$disconnect()

    return Response.json({message: "Success", seconds: user.seconds})
}