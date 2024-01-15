import React, { useState, useEffect } from "react";
import { DatesTable } from "../components/tables/DatesTable";
import { Link, useParams } from "react-router-dom";
import { CardPacient } from "../components/CardPacient";
import { Loader } from "../components/Loader";
import { ErrorPage } from "../pages/ErrorPage" 
import axios from "axios";

export const PacientPage = () => {
  const { id } = useParams();
  const [pacient, setPacient] = useState(null);
  const [dates, setDates] = useState([]);

  // Filters
  const [sorted, setSorted] = useState(null);
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/pacientes/${id}`).then((response) => {
      if (
        response.status >= 200 &&
        response.status <= 299 &&
        !response.data.message
      ) {
        return setPacient(response.data);
      } else {
        return setPacient([]);
      }
    });

    axios
      .get(`http://localhost:3000/api/citas/pacientes/${id}`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299 && !response.data.message) {
          return setDates(response.data);
        } else {
          return setDates([]);
        }
      });
  }, []);


  // DATES
  const filteredDates = () => {
    let filteredData = dates;

    // Order by
    if (sorted !== null) {
      switch (sorted) {
        case "nombre_paciente":
          return filteredData.sort((a, b) =>
            asc
              ? a.nombre_paciente.localeCompare(b.nombre_paciente)
              : b.nombre_paciente.localeCompare(a.nombre_paciente)
          );
        case "servicio":
          return filteredData.sort((a, b) =>
            asc
              ? a.servicio.localeCompare(b.servicio)
              : b.servicio.localeCompare(a.servicio)
          );
        case "nombre_empleado":
          return filteredData.sort((a, b) =>
            asc
              ? a.nombre_empleado.localeCompare(b.nombre_empleado)
              : b.nombre_empleado.localeCompare(a.nombre_empleado)
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
  }

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
      if (response.status >= 200 && response.status <= 299) {
        setDates(dates.filter((date) => date.id !== id));
      }
    });
  };


  if (pacient == null) {
    return (
      <div className="w-full flex justify-center">
        <Loader></Loader>
      </div>
    );
  } else if (pacient.id) {
    return (
      <div className="animate-fade">
        <div className="mb-8 flex gap-2 text-sm">
          <Link to="/pacients">Listado pacientes</Link>
          <span>&gt;</span>
          <Link to={`/pacients/${pacient.id}`}>{pacient.nombre}</Link>
        </div>
        <section className="my-3">
          <CardPacient pacient={pacient} setPacient={setPacient} setDates={setDates}></CardPacient>
        </section>
        <section className="bg-white p-5 w-full">
          <h2 className="text-lg font-semibold mb-5">
            Citas del paciente
          </h2>
          {dates.length >= 1 ? (
            <DatesTable 
            dates={filteredDates()}
            setSorted={setSorted}
            setAsc={setAsc}
            sorted={sorted}
            deleteDate={deleteDate}
            updateStatus={updateStatus}
            updateDate={updateDate}></DatesTable>
          ) : (
            <p>No dispone de citas</p>
          )}
        </section>
      </div>
    );
  } else {
    return (
      <ErrorPage></ErrorPage>
    );
  }
};
