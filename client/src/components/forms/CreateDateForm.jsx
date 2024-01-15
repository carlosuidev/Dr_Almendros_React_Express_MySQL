import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { useParams } from "react-router-dom";
import { SuccessAlert } from "../alerts/SuccessAlert";
import { formatEuDate } from "../../helpers/dates";
import { useSelector } from "react-redux";

export const CreateDateForm = ({setDates}) => {
  const { id } = useParams();
  const userAuth = useSelector((state) => state.userAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [servicesList, setServicesList] = useState(null);
  const [employeesList, setEmployeesList] = useState(null);

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:3000/api/citas/`, {
        id_paciente: id,
        id_servicio: data.service,
        fecha: formatEuDate(data.date),
        hora: data.hour,
        id_empleado: data.employee,
        descripcion: data.description,
      })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299 && response.data.id) {
          setShowError(null);
          setShowSuccess(`Se ha guardado la cita correctamente con el ID #${response.data.id}`);
          setDates(prev => [...prev, response.data])
        } else {
          setShowSuccess(null);
          setShowError(response.data.message);
        }
      });
  };

  useEffect(() => {
    // Get All Employees
    axios.get(`http://localhost:3000/api/empleados`).then((response) => {
      if (
        response.status >= 200 &&
        response.status <= 299 &&
        !response.data.message
      ) {
        setEmployeesList(response.data);
      } else {
        setEmployeesList([]);
      }
    });

    // Get All Services
    axios.get(`http://localhost:3000/api/servicios`).then((response) => {
      if (
        response.status >= 200 &&
        response.status <= 299 &&
        !response.data.message
      ) {
        setServicesList(response.data);
      } else {
        setServicesList([]);
      }
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 overflow-auto">
      {showError !== null && <ErrorAlert msg={showError}></ErrorAlert>}
      {showSuccess !== null && <SuccessAlert msg={showSuccess}></SuccessAlert>}
      <div className="flex flex-col">
        <label htmlFor="service" className="text-sm">
          Servicio
        </label>
        <select
          id="service"
          className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("service", {
            required: true,
          })}
        >
          {servicesList &&
            servicesList.map((service) => (
              <option key={service.id} value={service.id}>
                {service.servicio} ({service.coste} €)
              </option>
            ))}
        </select>
        {errors.service && errors.service.type === "required" && (
          <span className="text-red-500 mt-2 text-xs">
            Este campo es obligatorio
          </span>
        )}
      </div>
      {
        userAuth.cargo == 'Administrador' ? (
          <div className="flex flex-col">
        <label htmlFor="employee" className="text-sm">
          Asignar a
        </label>
        <select
          id="employee"
          className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("employee", {
            required: true,
          })}
        >
          {employeesList &&
            employeesList.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.nombre} - {employee.cargo}
              </option>
            ))}
        </select>
        {errors.employee && errors.employee.type === "required" && (
          <span className="text-red-500 mt-2 text-xs">
            Este campo es obligatorio
          </span>
        )}
      </div>
        ):(
          <input
          value={userAuth.id}
          type="hidden"
          id="employee"
          className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("employee", {
            required: true,
          })}
        ></input>
        )
      }
      

      <div className="flex flex-col">
        <label htmlFor="description" className="text-sm">
          Descripción
        </label>
        <textarea
          id="description"
          rows={4}
          className="mt-3 mb-1 py-2 peer relative w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...register("description", {
            required: false,
            maxLength: 255,
          })}
        />
        {errors.description && errors.description.type === "pattern" && (
          <span className="text-red-500 mt-2 text-xs">
            La descripción es demasiado larga
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="date" className="text-sm">
          Fecha y hora
        </label>
        <div className="grid gap-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
          <div className="w-full">
            <input
              type="date"
              id="date"
              className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              {...register("date", {
                required: true,
              })}
            />
            {errors.date && errors.date.type === "required" && (
              <span className="text-red-500 mt-2 text-xs">
                Debe indicar un día
              </span>
            )}
          </div>
          <div className="w-full">
            <input
              type="time"
              id="hour"
              className="mt-3 mb-1 peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              {...register("hour", {
                required: true,
              })}
            />
            {errors.hour && errors.hour.type === "required" && (
              <span className="text-red-500 mt-2 text-xs">
                Debe indicar una hora
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-cyan-300 disabled:bg-cyan-300 disabled:shadow-none"
      >
        <span>Asignar cita</span>
      </button>
    </form>
  );
};
