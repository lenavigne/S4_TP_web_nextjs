import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handle(req, res) {
    const {name} = req.body;
    const result = await prisma.group.create({
        data: {
            name: name
        },
    });
    res.json(result);
}
