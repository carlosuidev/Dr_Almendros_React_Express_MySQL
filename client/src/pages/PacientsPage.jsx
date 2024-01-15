import React, { useState, useEffect, useMemo } from "react";
import { useParams, Outlet } from "react-router-dom";
import { PacientsTable } from "../components/tables/PacientsTable";
import { Loader } from "../components/Loader";
import { NoResults } from "../components/NoResults";
import { CreatePacientModal } from "../components/modals/CreatePacientModal";
import axios from "axios";

export const PacientsPage = () => {
  const { id } = useParams();
  const [pacients, setPacients] = useState(null);

  const [sorted, setSorted] = useState(null);
  const [asc, setAsc] = useState(true);
  const [filter, setFilter] = useState(null);
  const [filterType, setFilterType] = useState('nombre');

  useEffect(() => {
    axios.get(`http://localhost:3000/api/pacientes`).then((response) => {
      if (
        response.status >= 200 &&
        response.status <= 299 &&
        !response.data.message
      ) {
        setPacients(response.data);
      } else {
        setPacients([]);
      }
    });
  }, []);

  const filteredPacients = useMemo(() => {
    return filter !== null
      ? pacients.filter((pacient) => {
          switch (filterType) {
            case "nombre":
              return pacient.nombre
                .toLowerCase()
                .startsWith(filter.toLowerCase());
            case "telefono":
              return pacient.telefono
                .toString()
                .toLowerCase()
                .startsWith(filter.toLowerCase());
            case "correo":
              return pacient.correo
                .toLowerCase()
                .startsWith(filter.toLowerCase());
          }
        })
      : pacients;
  }, [pacients, filter]);

  const sortedPacients = useMemo(() => {
    return sorted !== null
      ? filteredPacients.sort((a, b) => {
          switch (sorted) {
            case "nombre":
              return asc
                ? a.nombre.localeCompare(b.nombre)
                : b.nombre.localeCompare(a.nombre);
            case "telefono":
              return asc ? a.telefono - b.telefono : b.telefono - a.telefono;
            case "correo":
              return asc
                ? a.correo.localeCompare(b.correo)
                : b.correo.localeCompare(a.correo);
          }
        })
      : filteredPacients;
  }, [filteredPacients, sorted, asc]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div className="animate-fade-down">
      <h1 className="font-bold text-2xl mb-8 flex gap-2 items-center animate-fade-right animate-delay-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
            clipRule="evenodd"
          />
          <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
        </svg>
        <span>Pacientes</span>
      </h1>
      <section className="bg-white rounded p-5 shadow w-full">
        {id ? (
          <Outlet></Outlet>
        ) : (
          <div className="animate-fade">
            <div className="w-full my-5 gap-3 flex justify-between flex-wrap">
              <div className="gap-3 items-center flex flex-wrap">
                <div className="flex gap-3">
                  <select
                    name="filter"
                    id="filter"
                    onChange={handleFilterTypeChange}
                    className="peer relative h-10 w-fit rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="nombre">Por nombre</option>
                    <option value="correo">Por correo</option>
                    <option value="telefono">Por telefono</option>
                  </select>
                  <input
                    name="filter"
                    id="filter"
                    onChange={handleFilterChange}
                    type="text"
                    className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
              </div>
              <CreatePacientModal
                setPacients={setPacients}
              ></CreatePacientModal>
            </div>
            {sortedPacients == null ? (
              <Loader></Loader>
            ) : sortedPacients.length >= 1 ? (
              <PacientsTable
                pacients={sortedPacients}
                setSorted={setSorted}
                setAsc={setAsc}
                sorted={sorted}
              ></PacientsTable>
            ) : (
              <NoResults></NoResults>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
