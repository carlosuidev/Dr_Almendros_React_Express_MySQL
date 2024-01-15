import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

export const HomePage = () => {
  const userAuth = useSelector((state) => state.userAuth);
  const [dates, setDates] = useState({});

  const getPendingDates = () => {
    return dates.filter((date) => date.estado == "Pendiente").length;
  };

  const getCompletedDates = () => {
    return dates.filter((date) => date.estado == "Completado").length;
  };

  const getServicesDates = () => {
    const unique = new Set();
    dates.forEach((date) => {
      unique.add(date.id_servicio);
    });
    return unique.size;
  };

  const getPacientsDates = () => {
    const unique = new Set();
    const completed = dates.filter((date) => date.estado == "Completado");
    completed.forEach((date) => {
      unique.add(date.id_paciente);
    });
    return unique.size;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/citas/empleados/${userAuth.id}`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          setDates(response.data);
        } else {
          setDates([]);
        }
      });
  }, []);

  return (
    <div className="animate-fade-down">
      <h1 className="font-bold text-2xl mb-8 animate-fade-right animate-delay-300">
        Bienvenido a tu panel {userAuth.nombre} - {userAuth.cargo}
      </h1>
      <section className="bg-white rounded p-5 shadow lg:w-fit md:w-full w-full">
        <div className="flex gap-3 flex-wrap">
          <div className="bg-cyan-100 rounded shadow p-5 lg:w-[196px] md:w-[250px] w-full">
            <div className="w-10 h-10 bg-white rounded-full bg-white-100 mb-3 text-cyan-500 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                ></path>
              </svg>
            </div>
            <h3 className="text-sm">Tienes pendiente:</h3>
            <h2 className="font-semibold text-3xl mt-1.5 mb-1">
              {dates.length >= 1 ? getPendingDates() : "0"}
            </h2>
            <p className="text-xs uppercase font-medium">citas</p>
          </div>
          <div className="bg-white rounded shadow p-5 lg:w-[196px] md:w-[250px] w-full">
            <div className="w-10 h-10 rounded-full bg-cyan-100 mb-3 text-cyan-500 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                ></path>
              </svg>
            </div>
            <h3 className="text-sm">Has completado:</h3>
            <h2 className="font-semibold text-3xl mt-1.5 mb-1">
              {dates.length >= 1 ? getCompletedDates() : "0"}
            </h2>
            <p className="text-xs uppercase font-medium">citas</p>
          </div>
          <div className="bg-white rounded shadow p-5 lg:w-[196px] md:w-[250px] w-full">
            <div className="w-10 h-10 rounded-full bg-cyan-100 mb-3 text-cyan-500 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                ></path>
              </svg>
            </div>
            <h3 className="text-sm">Has realizado:</h3>
            <h2 className="font-semibold text-3xl mt-1.5 mb-1">
              {dates.length >= 1 ? getServicesDates() : "0"}
            </h2>
            <p className="text-xs uppercase font-medium">
              servicios diferentes
            </p>
          </div>
          <div className="bg-white rounded shadow p-5 lg:w-[196px] md:w-[250px] w-full">
            <div className="w-10 h-10 rounded-full bg-cyan-100 mb-3 text-cyan-500 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-sm">Has ayudado a:</h3>
            <h2 className="font-semibold text-3xl mt-1.5 mb-1">
              {dates.length >= 1 ? getPacientsDates() : "0"}
            </h2>
            <p className="text-xs uppercase font-medium">pacientes</p>
          </div>
        </div>
        <div className="mt-5 grid lg:grid-cols-2 grid-cols-1 w-fit gap-10 items-center p-5">
          <div className="col-span-1">
            <h5 className="text-sm uppercase font-semibold text-cyan-500">
              ¿ESTÁS LISTO?
            </h5>
            <h3 className="font-semibold text-3xl my-3 mb-5">
              Empieza a dar servicio <br /> a tus pacientes
            </h3>
            <Link
              to="/dates"
              className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-cyan-300 disabled:bg-cyan-300 disabled:shadow-none"
            >
              <span>Ir a Citas Asignadas</span>
            </Link>
          </div>
          <div className="col-span-1">
            <img
              src="massage.png"
              alt="Hombre tumbado en cama"
              className="lg:max-w-[325px] md:w-1/2 w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
