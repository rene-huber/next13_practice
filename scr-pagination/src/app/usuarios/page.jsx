"use client"
import React, { useState, useEffect } from "react";

async function fetchUsers(pageNumber) {
  const res = await fetch(`https://reqres.in/api/users?page=${pageNumber}`);
  const data = await res.json();
  return data;
}

function AllUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers(currentPage);
      setUserData(data.data);
      setTotalPages(data.total_pages);
    };

    fetchData();
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderUsers = () => {
    return userData.map((user) => (
      <div className="bg-gray-800 rounded-md p-4" key={user.id}>
        <h3 className="text-xl text-yellow-300">{user.first_name}</h3>
        <img src={user.avatar} alt={user.first_name} />
        <p className="text-pink-600 text-xs pt-3">{user.email}</p>
      </div>
    ));
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl text-center">Todos los Usuarios</h1>
      <div className="grid grid-cols-3 gap-4">{renderUsers()}</div>
      {renderPagination()}
    </div>
  );
}

export default AllUsers;
