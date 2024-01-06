import { getServerSession } from "next-auth";

import { authOptions }from "@/utils/auth"
import prisma from "@/utils/prismaConnect"
import Image from "next/image"

const onePost = async ({ params }) => {

  const slug = params.slug;
  const session = await getServerSession(authOptions);

  const userEmail = session?.user?.email;


console.log(slug, "session2222222")

console.log(slug, "session2222222")


const post = await prisma.post.findUnique({
  where: { slug },
})

if (!post) {
  return <div>Loading...</div>
}




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
      where: { slug: params.slug },
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



  

  return (
    <div>
      <h1 className="blog-title">{post.title}</h1>
      <h2>{post.user}</h2>
      <div className="blog-content">{post.desc}</div>
      <p>views: {post.views} </p>
      <Image src={post.img} alt={post.title} width={300} height={300} />
      <p>{post.userEmail}</p>


      {userEmail === post.userEmail && (
        <button>Edit Post</button>
      )}

    </div>
  );
};


export default onePost

