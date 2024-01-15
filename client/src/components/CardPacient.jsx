import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from  "axios"
import { CreateDateModal } from "./modals/CreateDateModal";
import { UpdatePacientModal } from "./modals/UpdatePacientModal";

export const CardPacient = ({ pacient, setDates, setPacient }) => {
  const userAuth = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  const handleDeletePacient = (id) => {
    axios.delete(`http://localhost:3000/api/pacientes/${id}`).then((response) => {
      if (
        response.status >= 200 &&
        response.status <= 299 &&
        !response.data.message
      ) {
        return navigate('/');
      }
    });
  }

  return (
    <div className="overflow-hidden rounded bg-white text-center text-slate-500 shadow-xs shadow-slate-200">
      <figure className="p-6 pb-0">
        <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full text-white">
          <div className="w-20 h-20 bg-cyan-200 rounded-full flex justify-center items-center text-cyan-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </span>
      </figure>
      <div className="p-6">
        <header className="mb-1">
          <h3 className="text-xl font-medium text-slate-700 mb-1">
            {pacient.nombre}
          </h3>
          <div className="flex gap-2 justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <span>{pacient.correo}</span>
            <span>|</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>

            <span>{pacient.telefono}</span>
          </div>
          <small className=" text-slate-400">
            {pacient.alergias == "" ? (
              <span>Sin alergias</span>
            ) : (
              <span>Alergias: {pacient.alergias}</span>
            )}
          </small>
        </header>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-2 p-6 pt-0">
        <CreateDateModal setDates={setDates}></CreateDateModal>
        { userAuth.cargo == 'Administrador' &&
          <>
          <UpdatePacientModal pacient={pacient} setPacient={setPacient}></UpdatePacientModal>
          <button
          onClick={() => handleDeletePacient(pacient.id)}
          className="inline-flex h-10 w-fit items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-red-50 px-5 text-sm font-medium tracking-wide text-red-500 transition duration-300 hover:bg-red-100 hover:text-red-600 focus:bg-red-200 focus:text-sky-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-100 disabled:text-red-400 disabled:shadow-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          <span className="order-2">Eliminar paciente</span>
        </button>
          </>
        }
      </div>
    </div>
  );
};
