
import Tarjeta from "../components/Tarjeta";
import Link from "next/link";

async function usuarios() {
  const res = await fetch(`https://reqres.in/api/users`);
  const usuarios = await res.json();
  return usuarios.data;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}

async function Home() {
  const users = await usuarios();
  // const shuffledUsers = users.sort(() => Math.random() - 0.5);
  const shuffledUsers = shuffleArray([...users]);
  
  return (
    <div>
      <h1 className="pt-2 pl-2 pb-5 text-xl text-pink-900">Participantes</h1>

      <div className="grid grid-cols-3 gap-4">
        {shuffledUsers.slice(0, 3).map((user) => (
          <div key={user.id}>
            <Link href={`/usuarios/${user.id}`}>
              <div className="bg-slate-800 rounded-xl p-4">
                <Tarjeta userr={user} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
