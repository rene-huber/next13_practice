"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      router.push('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <section>
      <h2>Register</h2>
      <form onSubmit={registerUser}>
        <div>
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
        <div>
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
        <div>
          <input
            placeholder='Name'
            name='name'
            id='name'
            type='text'
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />
        </div>
        <button type='submit'>Register</button>
      </form>   
    </section>
  )
}

export default Register;

