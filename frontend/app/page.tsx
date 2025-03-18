"use client"

import { useEffect, useState } from "react";

interface Algorithm {
  name: string;
  category: string;
  description: string;
}

export default function Home() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/algorithms")  // Ajustar puerto del backend
      .then((res) => res.json())
      .then((data) => setAlgorithms(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-5">Lista de Algoritmos</h1>
      <ul className="w-full max-w-md bg-white p-5 rounded-lg shadow-lg">
        {algorithms.map((algo, index) => (
          <li key={index} className="border-b py-2">
            <h2 className="text-lg font-semibold">{algo.name}</h2>
            <p className="text-gray-600">{algo.category}</p>
            <p className="text-gray-500">{algo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
