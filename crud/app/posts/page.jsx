import prisma from "@/utils/prismaConnect"
import Link from "next/link"
import Image from "next/image"
import CardList from "@/components/cardList/CardList";
import { getCurrentUser } from '@/utils/session';


const PostPage = async () => {

  const userr = await getCurrentUser();
  console.log(userr, "user344444")
      return (
    <>
            <CardList />
        
        </>
      );
    };

export default PostPage