import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST({request}) {

    const body = await request.json()

    const user = await prisma.user.findFirst({
        where: {
            email: body.email,
        }
    })

    const update = await prisma.user.update({
        where: {
            email: body.email,
        },
        data: {
            started: true
        }
    })
    const action = await prisma.log.create({
        data: {
            username: body.username,
            action: 1
        }
    })

    prisma.$disconnect()

    return Response.json({message: "Success", seconds: user.seconds})
}