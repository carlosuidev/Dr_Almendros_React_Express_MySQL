import React from "react";
import { Link } from "react-router-dom";

export const PacientsRow = ({ pacient }) => {
  return (
    <>
      <tr>
        <td className="h-12 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
          {pacient.id}
        </td>
        <td className="h-12 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
          <Link
            to={`/pacients/${pacient.id}`}
            className="font-semibold duration-300 hover:underline"
          >
            {pacient.nombre}
          </Link>
        </td>
        <td className="h-12 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
          {pacient.correo}
        </td>
        <td className="h-12 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
          {pacient.telefono}
        </td>
        <td className="h-12 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
          {pacient.alergias}
        </td>
        <td className="text-center text-sm">
          <Link className="text-cyan-500 underline text-medium" to={`/pacients/${pacient.id}`}>Ver perfil</Link>
        </td>
      </tr>
    </>
  );
};
