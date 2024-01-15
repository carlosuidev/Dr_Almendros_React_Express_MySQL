import React from "react";
// Redux
import { useSelector } from "react-redux";
import { UpdatePasswordForm } from "../components/forms/UpdatePasswordForm";

export const ProfilePage = () => {
  const userAuth = useSelector((state) => state.userAuth);
  return (
    <div className="animate-fade-down lg:w-fit md:w-full w-full">
      <h1 className="font-bold text-2xl mb-8 flex gap-2 items-center animate-fade-right animate-delay-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
        <span>Perfil</span>
      </h1>
      <section className="bg-white rounded p-5 shadow w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        <div className="flex flex-col gap-2 p-5 bg-slate-100 rounded shadow">
          <h3 className="text-lg font-bold mb-1">Tus datos de perfil</h3>
          <div>
            <small className="text-slate-400">Nombre y apellidos</small>
            <p className="text-sm">{userAuth.nombre}</p>
          </div>
          <div>
            <small className="text-slate-400">Correo</small>
            <p className="text-sm">{userAuth.correo}</p>
          </div>
          <div>
            <small className="text-slate-400">Cargo</small>
            <p className="text-sm">{userAuth.cargo}</p>
          </div>
          <div>
            <small className="text-slate-400">Contraseña</small>
            <p className="text-sm">***</p>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold mb-1">Actualizar contraseña</h3>
          <UpdatePasswordForm></UpdatePasswordForm>
        </div>
      </section>
    </div>
  );
};
