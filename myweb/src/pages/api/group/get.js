import { PrismaClient } from '@prisma/client';
import React from 'react';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function sertarien(req, res) {
    const session = await getSession({req});

    if(!session) {
        return res.status(418).json({message: 'Im a teapot!'});
    }

    const current_user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { group: true }
    });
    console.log(current_user);

    return res.status(200).json(current_user.group);
}
