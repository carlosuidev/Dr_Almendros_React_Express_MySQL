import React from "react";
import { Link } from "react-router-dom";
import { Badges } from "../Badges";
import { useParams } from "react-router-dom";
import { UpdateDateModal } from "../modals/UpdateDateModal";
// Redux
import { useSelector } from "react-redux";

export const DatesRow = ({ date, deleteDate, updateStatus, updateDate }) => {
  const { id } = useParams();
  const userAuth = useSelector((state) => state.userAuth);
  return (
    <>
      <tr>
        <td className="h-12 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
          {date.id}
        </td>
        <td className="h-12 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
          <Link
            to={`/pacients/${date.id_paciente}`}
            className="font-semibold duration-300 hover:underline"
          >
            {date.nombre_paciente}
          </Link>
        </td>
        {
          id &&
          <td className="h-12 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
          <Link
            to={`/employees/${date.id_empleado}`}
            className="font-semibold duration-300 hover:underline"
          >
            {date.nombre_empleado}
          </Link>
        </td>
        }
        <td className="h-12 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
          {date.servicio}
        </td>
        <td className="h-12 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
          {date.descripcion}
        </td>
        <td className="h-12 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
          {date.fecha} {date.hora}
        </td>
        <td className="h-12 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
          <Badges status={date.estado}></Badges>
        </td>
        <td className="h-12 flex justify-center px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 gap-3">
          {date.estado == "Pendiente" &&
            (userAuth.id == date.id_empleado ||
              userAuth.cargo == "Administrador") && (
              <button
                onClick={() => updateStatus(date.id)}
                className="inline-flex px-3 h-8 items-center justify-center gap-2 self-center whitespace-nowrap rounded text-xs font-medium tracking-wide text-green-500"
              >
                <span className="relative only:-mx-4">
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
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </button>
            )}
          {(userAuth.id == date.id_empleado ||
            userAuth.cargo == "Administrador") && (
            <>
              <UpdateDateModal date={date} updateDate={updateDate}></UpdateDateModal>
              <button
                onClick={() => deleteDate(date.id)}
                className="inline-flex px-3 h-8 items-center justify-center gap-2 self-center whitespace-nowrap rounded text-xs font-medium tracking-wide text-red-500"
              >
                <span className="relative only:-mx-4">
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
                </span>
              </button>
            </>
          )}
        </td>
      </tr>
    </>
  );
};
