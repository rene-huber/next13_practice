import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/libs/prisma"

export async function POST(request, response) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if(!name || !email || !password) {
        return new NextResponse('Missing Fields', { status: 400 })
    }

    const exist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(exist) {
        throw new Error('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });


    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}