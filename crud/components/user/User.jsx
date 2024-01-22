import Image from "next/image"
import Link from "next/link"



const User = async ({ item }) => {


  
  return (
    <div key={item.title}>
     
     
     <Link href={`/user/${item.name}`}>
          <Image src={item.image} alt={item.title} width={30} height={30} />
   
        </Link>
    
 
     
 
      
     
    </div>
  );
};

export default User;
