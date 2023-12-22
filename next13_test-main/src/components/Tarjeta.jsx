"use client";

function Tarjeta({userr}) {
  return (
    <div>
      <h3 className="text-xl text-yellow-300">{userr.first_name}</h3>
      <img src={userr.avatar} alt={userr.first_name} />
      <p className=" text-pink-600 text-xs pt-3">{userr.email}</p>
    </div>
  );
}

export default Tarjeta;
