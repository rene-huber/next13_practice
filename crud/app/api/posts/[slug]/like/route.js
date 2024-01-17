import { getAuthSession } from "@/utils/auth";
import { getCurrentUser } from '@/utils/session';
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/prismaConnect";
import { NextResponse } from "next/server";



export const POST = async (req,{ params}) => {
  const  {slug} = params;
  const session = await getCurrentUser();
  const userEmail = session?.user?.email;

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

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
    
    return new NextResponse(JSON.stringify(comment, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};







export const PUT = async (req,{ params}) => {
    const  {slug} = params;
    const session = await getCurrentUser();
    const userEmail = session?.user?.email;
  
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }
  
    try {
     
        const post = await prisma.post.update({ where: { slug: req.query.slug }});
  
      return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };
  
  