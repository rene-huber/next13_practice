import prisma from "@/utils/prismaConnect"
import Link from "next/link"
import Image from "next/image"
import CardList from "@/components/cardList/CardList";


const PostPage = async () => {


      return (
    <>
            <CardList />
        
        </>
      );
    };

export default PostPage