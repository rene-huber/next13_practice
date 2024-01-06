import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/auth";
import prisma from "@/utils/prismaConnect";
import Image from "next/image";

const onePost = async ({ params, page, cat }) => {
  const slug = params.slug;
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;



  if (userEmail) {
    const viewExists = await prisma.postView.findUnique({
      where: {
        postSlug_userEmail: {
          postSlug: slug,
          userEmail: userEmail,
        },
      },
    });

    if (!viewExists) {
      await prisma.post.update({
        where: { slug},
        data: { views: { increment: 1 } },
      });

      await prisma.postView.create({
        data: {
          postSlug: slug,
          userEmail: userEmail,
        },
      });
    }
  }

  const getData = async (page, cat) => {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed");
    }

    return res.json();
  };

  const data = await getData();

  return (
    <>
      <Image src={data.img} alt={data.title} width={300} height={300} />

      <h1>title: {data.title}</h1>
      <p>Description: {data.desc}</p>
      <p>AUTOR: {data.user.name}</p>
      <p>views: {data.views}</p>
      {data.user.email === userEmail && <button>edit</button>}
    </>
  );
};

export default onePost;
