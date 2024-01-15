import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { SuccessAlert } from "../alerts/SuccessAlert";

export const CreateServiceForm = ({setServices}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:3000/api/servicios/`, {
        servicio: data.nombre,
        coste: parseFloat(data.coste)
      })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299 && response.data.id) {
          setShowError(null);
          setShowSuccess(`Se ha guardado el servicio correctamente con el ID #${response.data.id}`);
          setServices(prev => [...prev, response.data])
        } else {
          setShowSuccess(null);
          setShowError(response.data.message);
          console.log(response.data.error)
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 overflow-auto">
      {showError !== null && <ErrorAlert msg={showError}></ErrorAlert>}
      {showSuccess !== null && <SuccessAlert msg={showSuccess}></SuccessAlert>}

      <div className="flex flex-col">
        <label htmlFor="nombre" className="text-sm">
          Denominación
        </label>
        <input
          id="nombre"
          type="text"
          className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("nombre", {
            required: true,
            maxLength: 64,
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s,.:()]*$/
          })}
        />
        {errors.nombre && errors.nombre.type === "required" && (
          <span className="text-red-500 mt-2 text-xs">
            Este campo es obligatorio
          </span>
        )}
        {errors.nombre && errors.nombre.type === "pattern" && (
          <span className="text-red-500 mt-2 text-xs">
            El nombre del servicio no es válido
          </span>
        )}
        {errors.nombre && errors.nombre.type === "maxLength" && (
          <span className="text-red-500 mt-2 text-xs">
            El nombre del servicio es demasiado largo
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="coste" className="text-sm">
          Coste
        </label>
        <input
          id="coste"
          type="text"
          className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("coste", {
            required: true,
            pattern: /^(\d{1,3})(\.\d{2})?$/,
          })}
        />
        {errors.coste && errors.coste.type === "required" && (
          <span className="text-red-500 mt-2 text-xs">
            Este campo es obligatorio
          </span>
        )}
        {errors.coste && errors.coste.type === "pattern" && (
          <span className="text-red-500 mt-2 text-xs">
            Use un coste válido (Ej 20.50)
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-cyan-300 disabled:bg-cyan-300 disabled:shadow-none"
      >
        <span>Crear servicio</span>
      </button>
    </form>
  );
};
