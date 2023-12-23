"use client";
import React, { useState, useEffect } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
 

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (password === '' || email === '') {
      toast.error('Fill all fields!');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const res = await signIn('credentials', { email, password, redirect: false });
      if (res?.error == null) {
        router.push('/');
      } else {
        toast.error('Error occurred while logging in');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div onClick={() => signIn("google")}>
          Sign in with Google
        </div>
        <div onClick={() => signIn("github")}>Sign in with Github</div>
        <div>Sign in with Facebook</div>
        
        <h2>Login with Email</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder='Email'
              name='email'
              type='email'
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div>
            <input
              placeholder='Password'
              name='password'
              type='password'
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default LoginPage;
