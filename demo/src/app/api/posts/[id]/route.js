import prisma from "@/utils/prismaConnect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { user: true },
    });

    await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong44!" }, { status: 500 })
    );
  }
};

export const POST = async (req, { params, body }) => {
  const { slug } = params;
  const { title, content } = body;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { title, content },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
}

export const DELETE = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.delete({
      where: { slug },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
}

export const PUT = async (req, { params, body }) => {
  const { slug } = params;
  const { title, content } = body;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { title, content },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
}
