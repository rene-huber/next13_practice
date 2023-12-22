import Tarjeta from "@/src/components/Tarjeta";


async function usuarios(id) {
    const res = await fetch(`https://reqres.in/api/users/${id}`);
    const usuarios = await res.json();
    return usuarios.data;
  }

async function Usuario({params}) {

    const user = await usuarios(params.id)

  return (
    <div className=" bg-slate-700 rounded-md p-5 max-w-sm  ">
       <Tarjeta userr={user} />
        <p className=" text-pink-600 text-xs pt-3">{user.email}</p>

    </div>
  )
}

export default Usuario