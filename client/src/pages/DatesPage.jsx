import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { DatesTable } from "../components/tables/DatesTable";
import { Loader } from "../components/Loader";
import { NoResults } from "../components/NoResults";
import axios from "axios";
import { formatEuDate } from "../helpers/dates";

export const DatesPage = () => {
  const userAuth = useSelector((state) => state.userAuth);

  const [dates, setDates] = useState(null);

  const [sorted, setSorted] = useState(null);
  const [asc, setAsc] = useState(true);
  const [filterDate, setFilterDate] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/citas/empleados/${userAuth.id}`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299 && !response.data.message) {
          setDates(response.data);
        } else {
          setDates([]);
        }
      });
  }, []);


  const filteredDates = () => {
    let filteredData = dates;

    // Filter by Date
    if (filterDate !== null) {
    filteredData = filteredData.filter((date) => date.fecha.includes(filterDate));
    }

    if(checked){
    filteredData = filteredData.filter((date) => date.estado == 'Pendiente');
    }

    // Order by
    if (sorted !== null) {
      switch (sorted) {
        case "nombre_paciente":
          return filteredData.sort((a, b) =>
            asc
              ? a.nombre_paciente.localeCompare(b.nombre_paciente)
              : b.nombre_paciente.localeCompare(a.nombre_paciente)
          );
        case "nombre_empleado":
          return filteredData.sort((a, b) =>
            asc
              ? a.nombre_empleado.localeCompare(b.nombre_empleado)
              : b.nombre_empleado.localeCompare(a.nombre_empleado)
          );
        case "servicio":
          return filteredData.sort((a, b) =>
            asc
              ? a.servicio.localeCompare(b.servicio)
              : b.servicio.localeCompare(a.servicio)
          );
        case "estado":
          return filteredData.sort((a, b) =>
            asc
              ? a.estado.localeCompare(b.estado)
              : b.estado.localeCompare(a.estado)
          );
        default:
          return filteredData;
      }
    } else {
      return filteredData;
    }
  };

  const updateStatus = (id) => {
    axios
      .patch(`http://localhost:3000/api/citas/${id}`, {
        estado: "Completado",
      })
      .then((response) => {
        console.log(response);

        if (
          response.status >= 200 &&
          response.status <= 299 &&
          !response.data.message
        ) {
          const index = dates.findIndex((date) => date.id === id);
          if (index !== -1) {
            setDates(
              dates.map((date, i) =>
                i === index ? { ...date, estado: "Completado" } : date
              )
            );
          }
        }
      });
  };

  const updateDate = (data) => {
    setDates(prev => 
      prev.map(d => 
        d.id === data.id ? data : d
      )
    );
  }

  const deleteDate = (id) => {
    axios.delete(`http://localhost:3000/api/citas/${id}`).then((response) => {
      console.log;
      if (response.status >= 200 && response.status <= 299) {
        setDates(dates.filter((date) => date.id !== id));
      }
    });
  };

  const handleFilterDate = (e) => {
    setFilterDate(formatEuDate(e.target.value));
  };

  const handleClear = () => {
    setFilterDate(null);
    setSorted(null);
    setAsc(true);
    setChecked(false);
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
            d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
            clipRule="evenodd"
          />
        </svg>

        <span>Citas asignadas</span>
      </h1>
      <section className="bg-white rounded p-5 shadow w-full">
        <div className="w-full my-5 gap-3 flex justify-between flex-wrap">
          <div className="gap-5 items-center flex flex-wrap">
            <input
              defaultValue={filterDate}
              onChange={handleFilterDate}
              type="date"
              name="filterDate"
              id="filterDate"
              className="relative w-fit h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
            <div>
              <div className="relative flex flex-wrap items-center">
                <input
                  className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-cyan-500 checked:bg-cyan-500 checked:hover:border-cyan-600 checked:hover:bg-cyan-600 focus:outline-none checked:focus:border-cyan-700 checked:focus:bg-cyan-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <label
                  className="cursor-pointer pl-2 text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 text-sm"
                >
                  Solo pendientes
                </label>
                <svg
                  className="pointer-events-none absolute left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  aria-labelledby="title-1 description-1"
                  role="graphics-symbol"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
                  />
                </svg>
              </div>
            </div>
            <button
              onClick={handleClear}
              className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded focus-visible:outline-none justify-self-center whitespace-nowrap bg-cyan-50 text-cyan-500 hover:bg-cyan-100 hover:text-cyan-600 focus:bg-cyan-200 focus:text-cyan-700 disabled:cursor-not-allowed disabled:border-cyan-300 disabled:bg-cyan-100 disabled:text-cyan-400 disabled:shadow-none"
            >
              <span>Limpiar filtros</span>
            </button>
          </div>
        </div>
        {filteredDates() == null ? (
          <Loader></Loader>
        ) : filteredDates().length >= 1 ? (
          <DatesTable
            dates={filteredDates()}
            setSorted={setSorted}
            setAsc={setAsc}
            sorted={sorted}
            deleteDate={deleteDate}
            updateStatus={updateStatus}
            updateDate={updateDate}
          ></DatesTable>
        ) : (
          <NoResults></NoResults>
        )}
      </section>
    </div>
  );
};
