import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { UpdateEmployeeModal } from "./modals/UpdateEmployeeModal";
import { EmployeeIcon } from "./EmployeeIcon";

export const CardEmployee = ({ employee, setEmployee }) => {
  const userAuth = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  const handleDeleteEmployee = (id) => {
    axios
      .delete(`http://localhost:3000/api/empleados/${id}`)
      .then((response) => {
        if (
          response.status >= 200 &&
          response.status <= 299 &&
          !response.data.message
        ) {
          return navigate("/");
        }
      });
  };

  return (
    <div className="overflow-hidden rounded bg-white text-center text-slate-500 shadow-xs shadow-slate-200">
      <figure className="p-6 pb-0">
        <span className="relative inline-flex items-center justify-center rounded-full text-white">
          <EmployeeIcon type={employee.cargo}></EmployeeIcon>
        </span>
      </figure>
      <div className="p-6">
        <header className="mb-1">
          <h3 className="text-xl font-medium text-slate-700 mb-1">
            {employee.nombre}
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
            <span>{employee.email}</span>
          </div>
          <p className=" text-cyan-400 mt-1">{employee.cargo}</p>
        </header>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-2 p-6 pt-0">
        {userAuth.cargo == "Administrador" && (
          <>
            <UpdateEmployeeModal
              employee={employee}
              setEmployee={setEmployee}
            ></UpdateEmployeeModal>
            {employee.id !== userAuth.id && (
              <button
                onClick={() => handleDeleteEmployee(employee.id)}
                className="inline-flex h-10 w-fit items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-red-50 px-5 text-sm font-medium tracking-wide text-red-500 transition duration-300 hover:bg-red-100 hover:text-red-600 focus:bg-red-200 focus:text-sky-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-100 disabled:text-red-400 disabled:shadow-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                <span className="order-2">Eliminar empleado</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
