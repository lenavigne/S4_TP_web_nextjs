import { PrismaClient } from "@prisma/client"
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

const prisma = new PrismaClient()

export default async function handle(req, res) {
    const session = await getServerSession(req, res, authOptions)
    console.log(session);
    const name = req.body.name;
    const user = session.user.email;
    const result = await prisma.group.create({
        data: {
            name: name,
            users: {
                connect: {
                    email: user
                }
            }
        },

    });


    res.json(result);
}
