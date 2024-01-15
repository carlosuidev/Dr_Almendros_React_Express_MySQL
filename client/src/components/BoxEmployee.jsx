import React from "react";
import { EmployeeIcon } from "./EmployeeIcon";
import { Link } from "react-router-dom";

export const BoxEmployee = ({ employee }) => {
  return (
    <Link to={`/employees/${employee.id}`} className="p-5 shadow bg-white rounded hover:shadow-lg duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center text-sky-500">
          <EmployeeIcon type={employee.cargo}></EmployeeIcon>
        </div>
        <div className="flex flex-col items-center justify-center w-full min-w-0 gap-0 text-base">
          <strong className="font-semibold text-slate-700">{employee.nombre}</strong>
          <p className="text-slate-500">{employee.cargo}</p>
        </div>
      </div>
    </Link>
  );
};
