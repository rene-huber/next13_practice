import prisma from "@/utils/prismaConnect"
import Link from "next/link"
import Image from "next/image"

const PostPage = async () => {
    const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
    });
    console.log(posts, "posts")
    
      return (
    <>
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                >
                
                <h2>{post.title}</h2>
                <p>Categorie: {post.catSlug}</p>
              
                <Image src={post.img} alt={post.title} width={300} height={300} />
              </Link>
            ))}
        
        </>
      );
    };

export default PostPage