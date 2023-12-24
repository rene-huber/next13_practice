'use client'

import { useSession, signOut } from 'next-auth/react';
import { useRouter, redirect } from "next/navigation"


const Dashboard = () => {
  // const status = useSession();


  const { data: session } = useSession()

console.log(session?.user.role)

if(session?.user?.role !== "ADMIN"){
  redirect('/login');
    }

    else {
  
      
   

// if(session.status === "loading"){
//   return <div>Loading...</div>
//   } 



  return (
<div>
      <h1>Dashboard - client protected </h1>
      <p>Lorem ipsum dolor sit amet consectetur 
        adipisicing elit. Blanditiis at ad nulla fugiat 
        unde consequatur velit rem repellendus tenetur. 
        Blanditiis quis dolores mollitia cum, corrupti porro 
        ad similique earum ab.</p>
      <p>Lorem ipsum dolor sit amet consectetur 
        adipisicing elit. Blanditiis at ad nulla fugiat 
        unde consequatur velit rem repellendus tenetur. 
        Blanditiis quis dolores mollitia cum, corrupti porro 
        ad similique earum ab.</p>
      <p>Lorem ipsum dolor sit amet consectetur 
        adipisicing elit. Blanditiis at ad nulla fugiat 
        unde consequatur velit rem repellendus tenetur. 
        Blanditiis quis dolores mollitia cum, corrupti porro 
        ad similique earum ab.</p>
      {/* {session ? (
        session.user.role === "ADMIN" ? (
          <p>Welcome Admin.</p>
        ) : (
          <p>Only Admins can access the dashboard.</p>
        )
      ) : (
        router.replace('/login')
      )} */}
    </div>
  )
}
}

export default Dashboard