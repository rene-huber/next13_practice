import prisma from "@/utils/prismaConnect";
import Image from "next/image";

import { getAuthSession } from "@/utils/auth";


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
      {/* <button onClick={handleDelete} className={classes.deleteButton}>deleteButton</button> */}
      
    </div>
  );
};

export default onePost;
