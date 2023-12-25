
import Link from "next/link";
import styles from "./singlePage.module.css";
import Image from "next/image";


const getData = async () => {
  const res = await fetch(`http://localhost:3000/api/posts/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async () => {
const data = await getData();

  return (
    <>
      <div className={styles.title}>
        {data.posts.map((e) => (
          <div key={e.id}>
            <h1>{e.title}</h1>
            <p>{e.desc?.substring(0, 6)}</p>
            <div key={e.id}>
              <Link href={`/posts/${e.slug}`}>   
          <p>click </p>
              </Link>
                          <Image src={e.img} alt="" width={300} height={300} />
          </div>

          </div>
        ))}
      </div>

      
      
    </>
  );


};

export default SinglePage;
