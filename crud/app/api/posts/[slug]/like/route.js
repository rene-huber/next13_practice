
import { getCurrentUser } from '@/utils/session';
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/prismaConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/auth';


export const POST = async (req,{ params}) => {
  const  {slug} = params;
  const session = await getCurrentUser();
  const userEmail = session?.user?.email;

  console.log(session, "4444444444444")

  // if (!session) {
  //   return new NextResponse(
  //     JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
  //   );
  // }

  try {
    let like = await prisma.like.findUnique({
      where: {
        postSlug_userEmail: {
          postSlug: slug,
          userEmail: userEmail,
        },
      },
    });

    if (like) {
      await prisma.like.delete({ where: { id: like.id } });
    } else {
      like = await prisma.like.create({
        data: { postSlug: slug, userEmail: userEmail },
      });
    }

    return new NextResponse(JSON.stringify(like, { status: 200 }));
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

  
  