import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { SuccessAlert } from "../alerts/SuccessAlert";

const roles = [
  {
    id: 1,
    cargo: 'Administrador'
  },
  {
    id: 2,
    cargo: 'Auxiliar'
  },
  {
    id: 3,
    cargo: 'Fisioterapeuta'
  }
]

export const UpdateEmployeeForm = ({ employee, setEmployee }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [roleList, setRoleList] = useState(roles);

  const onSubmit = (data) => {
    axios
      .patch(`http://localhost:3000/api/empleados/${employee.id}`, {
        nombre: data.nombre,
        email: data.correo,
        cargo: data.cargo,
      })
      .then((response) => {
        console.log(response)
        if (
          response.status >= 200 &&
          response.status <= 299 &&
          response.data.id
        ) {
          setShowError(null);
          setShowSuccess(`Se ha actualizado corectamente`);
          setEmployee(response.data);
        } else {
          setShowSuccess(null);
          setShowError(response.data.message);
        }
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 overflow-auto"
    >
      {showError !== null && <ErrorAlert msg={showError}></ErrorAlert>}
      {showSuccess !== null && <SuccessAlert msg={showSuccess}></SuccessAlert>}
      <div className="flex flex-col">
        <label htmlFor="nombre" className="text-sm">
          Nombre y apellidos
        </label>
        <input
          defaultValue={employee.nombre}
          type="text"
          id="nombre"
          className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("nombre", {
            required: true,
            maxLength: 64,
            pattern:
              /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?<!\s)$/,
          })}
        ></input>
        {errors.nombre && errors.nombre.type === "required" && (
          <span className="text-red-500 mt-2 text-xs">
            Este campo es obligatorio
          </span>
        )}
        {errors.nombre && errors.nombre.type === "maxLength" && (
          <span className="text-red-500 mt-2 text-xs">Es demasiado largo</span>
        )}
        {errors.nombre && errors.nombre.type === "pattern" && (
          <span className="text-red-500 mt-2 text-xs">
            Use un nombre y apellidos válidos
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="correo" className="text-sm">
          Correo electrónico
        </label>
        <input
          defaultValue={employee.email}
          type="mail"
          id="correo"
          className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("correo", {
            required: true,
            maxLength: 128,
            pattern: /^[a-z0-9](\.?[a-z0-9]){1,}@dralmendros\.com$/,
          })}
        ></input>
        {errors.correo && errors.correo.type === "required" && (
          <span className="text-red-500 mt-2 text-xs">
            Este campo es obligatorio
          </span>
        )}
        {errors.correo && errors.correo.type === "maxLength" && (
          <span className="text-red-500 mt-2 text-xs">
            Use un correo de menor tamaño
          </span>
        )}
        {errors.correo && errors.correo.type === "pattern" && (
          <span className="text-red-500 mt-2 text-xs">
            Use un correo válido para el dominio
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="cargo" className="text-sm">
          Cargo
        </label>
        <select
          id="cargo"
          className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("cargo", {
            required: true,
          })}
        >
          {
            roleList && roleList.map((role, i) => <option value={role.cargo} key={i}>{role.cargo}</option> )
          }
        </select>
        {errors.cargo && errors.cargo.type === "required" && (
          <span className="text-red-500 mt-2 text-xs">
            Seleccione un cargo
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-cyan-300 disabled:bg-cyan-300 disabled:shadow-none"
      >
        <span>Guardar la información</span>
      </button>
    </form>
  );
};
