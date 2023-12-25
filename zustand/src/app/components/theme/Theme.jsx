"use client";

import Image from "next/image";
import styles from "./theme.module.css";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const Theme = () => {
  const { toggle, theme } = useContext(ThemeContext);

  return (
    <div
      className={styles.container}
      onClick={toggle}
      style={
        theme === "dark" ? { backgroundColor: "white" } : { backgroundColor: "#0f172a" }
      }
    >
      <Image src="/public/dancingbaby.gif" alt="" width={14} height={14} />
      <div
        className={styles.ball}
        style={
          theme === "dark"
            ? { left: 1, background: "#0f172a" }
            : { right: 1, background: "white" }
        }
      ></div>
      <Image src="/public/dancingbaby.gif" alt="" width={14} height={14} />
    </div>
  );
};

export default Theme;
