import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

const Admin = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div>
          <h1>Server protected </h1>
          <p>Lorem ipsum dolor sit amet consectetur 
            adipisicing elit. Blanditiis at ad nulla fugiat 
            unde consequatur velit rem repellendus tenetur. 
            Blanditiis quis dolores mollitia cum, corrupti porro 
            ad similique earum ab.</p> </div>
      )
}

export default Admin
