import React from "react";
import { DatesRow } from "./DatesRow";
import { useParams } from "react-router-dom";

export const DatesTable = ({
  dates,
  setSorted,
  setAsc,
  sorted,
  deleteDate,
  updateStatus,
  updateDate
}) => {

  const { id } = useParams(); 
  
  const handleSorted = (type) => {
    if (sorted == type) {
      setAsc((prev) => !prev);
    } else {
      setSorted(type);
      setAsc(true);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table
        className="w-full text-left rounded w-overflow-x-auto "
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th
              scope="col"
              className="h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              ID
            </th>

            <th
              onClick={() => handleSorted("nombre_paciente")}
              scope="col"
              className="cursor-pointer h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path d="M14 2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2.172a2 2 0 0 0 .586 1.414l2.828 2.828A2 2 0 0 1 6 9.828v4.363a.5.5 0 0 0 .724.447l2.17-1.085A2 2 0 0 0 10 11.763V9.829a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 0 14 4.172V2Z" />
                </svg>
                <span>Pacientes</span>
              </div>
            </th>

            { id &&
              <th
              onClick={() => handleSorted("nombre_empleado")}
              scope="col"
              className="cursor-pointer h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path d="M14 2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2.172a2 2 0 0 0 .586 1.414l2.828 2.828A2 2 0 0 1 6 9.828v4.363a.5.5 0 0 0 .724.447l2.17-1.085A2 2 0 0 0 10 11.763V9.829a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 0 14 4.172V2Z" />
                </svg>
                <span>Empleado</span>
              </div>
            </th>
            }

            <th
              onClick={() => handleSorted("servicio")}
              scope="col"
              className="cursor-pointer h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path d="M14 2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2.172a2 2 0 0 0 .586 1.414l2.828 2.828A2 2 0 0 1 6 9.828v4.363a.5.5 0 0 0 .724.447l2.17-1.085A2 2 0 0 0 10 11.763V9.829a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 0 14 4.172V2Z" />
                </svg>
                <span>Servicio</span>
              </div>
            </th>

            <th
              scope="col"
              className="h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Descripción
            </th>
            <th
              scope="col"
              className="h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Fecha y hora
            </th>

            <th
              onClick={() => handleSorted("estado")}
              scope="col"
              className="cursor-pointer h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path d="M14 2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2.172a2 2 0 0 0 .586 1.414l2.828 2.828A2 2 0 0 1 6 9.828v4.363a.5.5 0 0 0 .724.447l2.17-1.085A2 2 0 0 0 10 11.763V9.829a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 0 14 4.172V2Z" />
                </svg>
                <span>Estado</span>
              </div>
            </th>

            <th
              scope="col"
              className="text-center h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date, i) => (
            <DatesRow
              key={i}
              date={date}
              deleteDate={deleteDate}
              updateStatus={updateStatus}
              updateDate={updateDate}
            ></DatesRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};
