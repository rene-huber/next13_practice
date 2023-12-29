"use client";
import { signIn, useSession, signOut } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }
console.log(status, "status")
//   if (status === "authenticated") {
//     router.push("/")
//   }
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => signIn("google")}>
          Sign in with Google
        </div>
        {status === "authenticated" ? (
    <button onClick={() => signOut()}>Log Out</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default LoginPage;
