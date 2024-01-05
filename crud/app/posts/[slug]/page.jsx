import { getServerSession } from "next-auth";

import { authOptions }from "@/utils/auth"
import prisma from "@/utils/prismaConnect"
import Image from "next/image"

const onePost = async ({ params }) => {

  const session = await getServerSession(authOptions);
  const slug = params.slug;
   const userEmail = session?.user?.email;

console.log(session, "session2")



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
      where: { slug },
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








  // await prisma.post.update({
  //   where: { slug },
  //   data: { views: { increment: 1 } },
  //   include: { user: true },

  // });


  const post = await prisma.post.findUnique({
    where: { slug},
  })

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="blog-title">{post.title}</h1>
      <h2>{post.user}</h2>
      <div className="blog-content">{post.desc}</div>
      <p>views: {post.views} </p>
      <Image src={post.img} alt={post.title} width={300} height={300} />
      
    </div>
  );
};

export default onePost