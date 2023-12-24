'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import {  useSession } from "next-auth/react";


const Login = () => {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  console.log(data,"data")
  
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
      console.log(error);
    }
  };
  return (
    <section>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col mb-2'>
      <div className='flex relative'>
      <input
     
        placeholder='Email'
        name='email'
        id='email'
        type='email'
        value={data.email}
        onChange={(e) => {
          setData({ ...data, email: e.target.value });
        }}
      />
      </div>
      </div>
      <div className='flex flex-col mb-2'>
      <div className='flex relative'>
      <input
        placeholder='Password'
        name='password'
        id='password'
        type='password'
        value={data.password}
        onChange={(e) => {
          setData({ ...data, password: e.target.value });
        }}
      />
         </div>
         </div>
    
      <button
            type='submit'>Login</button>
    </form>
  </section>
  )
}

export default Login