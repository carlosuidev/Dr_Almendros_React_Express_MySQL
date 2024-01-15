import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { SuccessAlert } from "../alerts/SuccessAlert";
import { useSelector } from "react-redux";

export const UpdatePasswordForm = () => {
  const userAuth = useSelector((state) => state.userAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:3000/api/auth/login`, {
        email: userAuth.correo,
        contrasena: data.actual,
      })
      .then((response) => {
        console.log(response);
        if (
          response.status >= 200 &&
          response.status <= 200 &&
          response.data.id == userAuth.id
        ) {
          axios
            .patch(`http://localhost:3000/api/auth/password/${userAuth.id}`, {
              nueva: data.new,
            })
            .then((response) => {
              if (
                response.status >= 200 &&
                response.status <= 200 &&
                response.data.id == userAuth.id
              ) {
                setShowError(null);
                setShowSuccess("Se ha actualizado la contraseña correctamente");
              } else {
                setShowSuccess(null);
                setShowError(response.data.message);
              }
            });
        } else {
          setShowSuccess(null);
          setShowError(response.data.message);
        }
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 overflow-auto mt-5"
    >
      {showError !== null && <ErrorAlert msg={showError}></ErrorAlert>}
      {showSuccess !== null && <SuccessAlert msg={showSuccess}></SuccessAlert>}
      <div className="flex flex-col">
        <label htmlFor="actual" className="text-sm">
          Contraseña actual
        </label>
        <input
          type="password"
          id="actual"
          className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("actual", {
            required: true,
            maxLength: 16,
            pattern: /^[a-zA-Z0-9]+$/,
          })}
        />
        {errors.actual && errors.actual.type === "required" && (
          <span className="text-red-500 mt-2 text-xs">
            Este campo es obligatorio
          </span>
        )}
        {errors.actual && errors.actual.type === "maxLength" && (
          <span className="text-red-500 mt-2 text-xs">
            La contraseña es demasiado larga
          </span>
        )}
        {errors.actual && errors.actual.type === "pattern" && (
          <span className="text-red-500 mt-2 text-xs">
            Utilice una contraseña correcta
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="new" className="text-sm">
          Contraseña nueva
        </label>
        <input
          type="password"
          id="new"
          className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("new", {
            required: true,
            maxLength: 16,
            pattern: /^[a-zA-Z0-9]+$/,
          })}
        />
        {errors.new && errors.new.type === "required" && (
          <span className="text-red-500 mt-2 text-xs">
            Este campo es obligatorio
          </span>
        )}
        {errors.new && errors.new.type === "maxLength" && (
          <span className="text-red-500 mt-2 text-xs">
            La contraseña es demasiado larga
          </span>
        )}
        {errors.new && errors.new.type === "pattern" && (
          <span className="text-red-500 mt-2 text-xs">
            Utilice una contraseña correcta
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-cyan-300 disabled:bg-cyan-300 disabled:shadow-none"
      >
        <span>Actualizar contraseña</span>
      </button>
    </form>
  );
};
