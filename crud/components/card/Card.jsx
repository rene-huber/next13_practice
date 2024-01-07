import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ item }) => {
  return (
    <div className={styles.container} key={item.title}>
      <Link href={`/posts/${item.slug}`}>
      {item.img && (
         <Image src={item.img} alt={item.title} width={300} height={300} />
      
      )}
      <div className={styles.textContainer}>
     
          <h1>{item.title}</h1>
       
      
      </div>
        </Link>
    </div>
  );
};

export default Card;
