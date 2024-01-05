"use client";
import { signIn,signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react"
import css from "./loginPage.module.css";
import { useRouter, redirect } from "next/navigation";


 

const LoginPage = () => {
  const status = useSession();

 console.log(status)

  const router = useRouter();

  
if (status.status === "authenticated" && status.data.user.role === "ADMIN") {
  router.push("/dashboard")
  }


  const [data, setData] = useState({
    email: '',
    password: ''
    })
  

const loginUser = async (e) => {
  e.preventDefault()
  signIn('credentials',
   {...data, redirect: false
  })
  .then((callback) => {
      if (callback?.error) {
          toast.error(callback.error)
      }

      if(callback?.ok && !callback?.error) {
          toast.success('Logged in successfully!')
      }
  } )
}


 
  return (
    <div className={css.container}>
  

<form onSubmit={loginUser}>
  <div>
    <h1>ADMIN role </h1>
    <label htmlFor="email">admin@example.com<br></br> -pass- 123456</label>
   
    <div>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
      />
    </div>
  </div>

  <div>
    <div>
      <label htmlFor="password">Password</label>
      <div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
    </div>
  </div>

  <div>
    <button type="submit">Sign in</button>
  </div>
</form>

      <div className={css.wrapper}>
        <div className={css.socialButton} onClick={() => signIn("google")}>
          Sign in with Google
        </div>
        <div className={css.socialButton} onClick={() => signIn("github")}>Sign in with Github</div>
        <div className={css.socialButton} onClick={() => signIn("facebook")}>Sign in with Facebook</div>

      
      </div>
      <section>
        <div className={css.or}>OR</div>
        {status !== "authenticated" ? (
    <button onClick={() => signOut()}>Log Out</button>
        ) : (
          <p>Not signed in</p>
        )}
      </section>
    </div>
  );
};

export default LoginPage;
