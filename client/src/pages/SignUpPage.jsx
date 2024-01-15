import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { EmployeeIcon } from "../components/EmployeeIcon";
import axios from "axios";
import { ErrorAlert } from "../components/alerts/ErrorAlert";

export const SignUpName = ({ setProgress, setName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setName(data.nombre);
    setProgress(2);
  };

  return (
    <div className="flex flex-col justify-center items-center animate-fade-down animate-ease-in">
      <h2 className="text-2xl font-bold text-center">
        ¿Cómo se llama el nuevo empleado?
      </h2>
      <p className="text-center mt-2">
        Escriba el nombre y apellido del empleado
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-auto mt-8"
      >
        <label htmlFor="nombre" className="text-sm">
          Nombre y apellidos
        </label>
        <input
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
        <div className="w-full flex justify-center items-center gap-2 mt-6">
          <button
            type="submit"
            className="w-full py-2 inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-cyan-300 disabled:bg-cyan-300 disabled:shadow-none"
          >
            <span>Siguiente</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export const SignUpRole = ({ setProgress, setRole }) => {
  const onSubmit = (role) => {
    setRole(role);
    setProgress(3);
  };

  return (
    <div className="flex flex-col justify-center items-center animate-fade-down animate-ease-in">
      <h2 className="text-2xl font-bold text-center">¿Qué cargo dispondrá?</h2>
      <p className="text-center mt-2">
        Seleccione uno entre los diferentes cargos
      </p>
      <div className="flex flex-col overflow-auto mt-8">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-2 justify-center items-center flex-wrap">
          <button
            onClick={() => onSubmit("Administrador")}
            div
            className="bg-white rounded shadow hover:bg-cyan-50 border p-20 hover:shadow-xl duration-300 flex flex-col justify-center items-center cursor-pointer"
          >
            <EmployeeIcon type={"Administrador"} width={96}></EmployeeIcon>
            <p className="text-center mt-5">Administrador</p>
          </button>
          <button
            onClick={() => onSubmit("Fisioterapeuta")}
            div
            className="hover:bg-cyan-50 bg-white rounded shadow-sm border p-20 hover:shadow-xl duration-300 flex flex-col justify-center items-center cursor-pointer"
          >
            <EmployeeIcon type={"Fisioterapeuta"} width={96}></EmployeeIcon>
            <p className="text-center mt-5">Fisioterapeuta</p>
          </button>
          <button
            onClick={() => onSubmit("Auxiliar")}
            div
            className="hover:bg-cyan-50 bg-white rounded shadow-sm border p-20 hover:shadow-xl duration-300 flex flex-col justify-center items-center cursor-pointer"
          >
            <EmployeeIcon type={"Auxiliar"} width={96}></EmployeeIcon>
            <p className="text-center mt-5">Auxiliar</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export const SignUpEmail = ({ setProgress, setEmail }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    axios
      .get(`http://localhost:3000/api/auth/check-mail/${data.correo}`)
      .then((response) => {
        console.log(response);
        if (
          response.status >= 200 &&
          response.status <= 299 &&
          !response.data.message
        ) {
          if (response.data.uso == "N") {
            setError(null);
            setEmail(data.correo);
            setProgress(4);
          } else {
            setError("Correo en uso");
          }
        } else {
          setError(response.data.message);
        }
      });
  };

  return (
    <div className="flex flex-col justify-center items-center animate-fade-down animate-ease-in">
      <h2 className="text-2xl font-bold text-center">
        Correo electrónico para el empleado
      </h2>
      <p className="text-center mt-2">Use uno del dominio @dralmendros.com</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-auto mt-8"
      >
        {error && (
          <div className="flex justify-center items-end mb-5">
            <ErrorAlert msg={error}></ErrorAlert>
          </div>
        )}
        <label htmlFor="correo" className="text-sm">
          Correo electrónico
        </label>
        <input
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
        <div className="w-full flex justify-center items-center gap-2 mt-6">
          <button
            type="submit"
            className="w-full py-2 inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-cyan-300 disabled:bg-cyan-300 disabled:shadow-none"
          >
            <span>Finalizar</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const SignUpFinish = ({ name, email, role }) => {
  const [created, setCreated] = useState(false);

  useEffect(() => {
    axios
      .post(`http://localhost:3000/api/empleados/`, {
        nombre: name,
        email: email,
        cargo: role,
        contrasena: "temporal123",
      })
      .then((response) => {
        console.log(response);
        if (
          response.status >= 200 &&
          response.status <= 299 &&
          response.data.id
        ) {
          setCreated(true);
        } else {
          setCreated(false);
        }
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center animate-fade-down animate-ease-in">
      {created ? (
        <>
          <h2 className="text-2xl font-bold text-center">Se he creado la cuenta corretamente</h2>
          <p className="text-center mt-2">La contraseña es "temporal123" y deberá ser actualizada por el empleado</p>
          <img src="correcto.png" alt="Correcto" width={248} className="mt-8"/>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center">No se ha podido crear la cuenta correctamente</h2>
          <p className="text-center mt-2">Inténtelo de nuevo</p>
          <img src="incorrecto.png" alt="Incorrecto" width={248} className="mt-8"/>
        </>
      )}
    </div>
  );
};

export const SignUpPage = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [progress, setProgress] = useState(1);

  return (
    <div className="animate-fade flex-col flex justify-center items-center w-full">
      <progress
        id="p01a"
        max="4"
        value={progress}
        className="animate-pulse w-full overflow-hidden rounded bg-slate-200 [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-value]:bg-cyan-500 [&::-moz-progress-bar]:bg-cyan-500"
      ></progress>
      <section className="mt-20 min-h-[300px]">
        {progress == 1 && (
          <SignUpName setName={setName} setProgress={setProgress}></SignUpName>
        )}
        {progress == 2 && (
          <SignUpRole setRole={setRole} setProgress={setProgress}></SignUpRole>
        )}
        {progress == 3 && (
          <SignUpEmail
            setEmail={setEmail}
            setProgress={setProgress}
          ></SignUpEmail>
        )}
        {progress == 4 && (
          <SignUpFinish name={name} email={email} role={role}></SignUpFinish>
        )}
      </section>
    </div>
  );
};
