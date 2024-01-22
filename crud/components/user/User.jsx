import Image from "next/image"
import Link from "next/link"

const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};


const User = async ({ item }) => {

  const slugifiedName = slugify(item.name);
  
  return (
    <div key={item.title}>
     
     
     <Link href={`/user/${slugifiedName}`}>
          <Image src={item.image} alt={item.title} width={30} height={30} />
   
        </Link>
    
 
     
 
      
     
    </div>
  );
};

export default User;
