import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorAlert } from "../alerts/ErrorAlert";
// Redux
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/userAuthSlice";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showError, setShowError] = useState(null);

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:3000/api/auth/login`, {
        email: data.mail,
        contrasena: data.password,
      })
      .then((response) => {
        if (response.data.id) {
          setShowError(null);
          const userLogged = {
            id: response.data.id,
            cargo: response.data.cargo,
            nombre: response.data.nombre,
            correo: response.data.email,
          };
          localStorage.setItem("userAuth", JSON.stringify(userLogged));
          dispatch(logIn(userLogged));
          navigate("/");
        } else {
          setShowError(response.data.message);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {showError !== null && <ErrorAlert msg={showError}></ErrorAlert>}
      <div className="flex flex-col">
        <label htmlFor="mail" className="text-sm">
          Correo electrónico
        </label>
        <input
          type="mail"
          id="mail"
          className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("mail", {
            required: true,
            maxLength: 128,
            pattern: /^[a-z0-9](\.?[a-z0-9]){1,}@dralmendros\.com$/,
          })}
        />
        {errors.mail && errors.mail.type === "required" && (
          <span className="text-red-500 mt-2 text-xs">
            Este campo es obligatorio
          </span>
        )}
        {errors.mail && errors.mail.type === "maxLength" && (
          <span className="text-red-500 mt-2 text-xs">
            El correo es demasiado largo
          </span>
        )}
        {errors.mail && errors.mail.type === "pattern" && (
          <span className="text-red-500 mt-2 text-xs">
            El correo no pertenece al dominio
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("password", {
            required: true,
            maxLength: 16,
            pattern: /^[a-zA-Z0-9]+$/,
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <span className="text-red-500 mt-2 text-xs">
            Este campo es obligatorio
          </span>
        )}
        {errors.password && errors.password.type === "maxLength" && (
          <span className="text-red-500 mt-2 text-xs">
            La contraseña es demasiado larga
          </span>
        )}
        {errors.password && errors.password.type === "pattern" && (
          <span className="text-red-500 mt-2 text-xs">
            Utilice una contraseña correcta
          </span>
        )}
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-cyan-300 disabled:bg-cyan-300 disabled:shadow-none"
      >
        <span>Iniciar sesión</span>
      </button>
    </form>
  );
};
