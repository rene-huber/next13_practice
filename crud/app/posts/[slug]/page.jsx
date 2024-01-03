import prisma from "@/utils/prismaConnect";
import Image from "next/image";

const onePost = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
        slug: params.slug,
    },
  });

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="blog-title">{post.title}</h1>
      <p>views: {post.views}</p>
      <div className="blog-content">{post.desc}</div>
      <Image src={post.img} alt={post.title} width={300} height={300} />
      
    </div>
  );
};

export default onePost;
