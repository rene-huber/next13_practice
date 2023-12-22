import Link from "next/link"

function NavBar() {
  return (
    <div>
        <ul>
            <Link href="/"> 
            <li>Home</li>
            </Link>
            <Link href="/usuarios"> <li>
              Usuarios
            </li>
            </Link>
            <Link href="/"> 
            </Link>

       

        </ul>
    </div>
  )
}

export default NavBar