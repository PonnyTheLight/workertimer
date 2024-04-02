import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import {hash, genSalt} from 'bcrypt'

export async function POST({request}) {
    const body = await request.json()

    const salt = genSalt(10, function (err, salt) {
        hash(body.password, salt, async function (err, hash) {
            console.log(hash)
            await prisma.admin.create({
                data: {
                    username: "ponnyy",
                    password: hash
                }
            })
        });
    });

    return Response.json({message: "Success"})
}