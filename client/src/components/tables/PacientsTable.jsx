import React from "react";
import { PacientsRow } from "./PacientsRow";
import { useParams } from "react-router-dom"

export const PacientsTable = ({
  pacients,
  setSorted,
  setAsc,
  sorted,
}) => {
  
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
              onClick={() => handleSorted("nombre")}
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
                <span>Nombre</span>
              </div>
            </th>
            <th
              onClick={() => handleSorted("correo")}
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
                <span>Correo</span>
              </div>
            </th>

            <th
              onClick={() => handleSorted("telefono")}
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
                <span>Telefono</span>
              </div>
            </th>

            <th
              scope="col"
              className="h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Alergias
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
          {pacients.map((pacient, i) => (
            <PacientsRow
              key={i}
              pacient={pacient}
            ></PacientsRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};
