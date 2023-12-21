"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';



const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const CLOUD_NAME = 'huberlin'
    const UPLOAD_PRESET = 'blog13'

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState('')

  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const uploadImage = async () => {
    if (!photo) return

    const formData = new FormData()

    formData.append("file", photo)
    formData.append("upload_preset", UPLOAD_PRESET)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      const imageUrl = data['secure_url']

      return imageUrl
    } catch (error) {
        console.log(error)
    }
}

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {

    const imageUrl = await uploadImage()

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: imageUrl,
        slug: slugify(title),
        catSlug: catSlug || "style", //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };


  
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <div className={styles.editor}>
     
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setPhoto(e.target.files[0])}
              
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
    
          <textarea placeholder='Description...' onChange={(e) => setValue(e.target.value)} />
   
      {/* <input id='image' type="file" style={{ background: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} /> */}


       {/* <ReactQuill
          className={styles.textArea}
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        /> */}
      </div>
     
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
