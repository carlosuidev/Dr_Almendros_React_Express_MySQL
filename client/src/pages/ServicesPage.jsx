import React, { useState, useEffect, useMemo } from "react";
import { CardService } from "../components/CardService";
import { Loader } from "../components/Loader";
import { NoResults } from "../components/NoResults";
import { CreateServiceModal } from "../components/modals/CreateServiceModal";
import axios from "axios";

export const ServicesPage = () => {
  const [services, setServices] = useState(null);

  const [find, setFind] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/servicios`).then((response) => {
      if (
        response.status >= 200 &&
        response.status <= 299 &&
        !response.data.message
      ) {
        setServices(response.data);
      } else {
        setServices([]);
      }
    });
  }, []);

  const filteredServices = useMemo(() => {
    return find !== null
      ? services.filter((service) => {
          return service.servicio.toLowerCase().includes(find.toLowerCase());
        })
      : services;
  }, [services, find]);

  const deleteService = (id) => {
    axios
      .delete(`http://localhost:3000/api/servicios/${id}`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          setServices(services.filter((s) => s.id !== id));
        }
      });
  };

  const handleFindChange = (e) => {
    setFind(e.target.value);
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
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
        <span>Servicios</span>
      </h1>
      <section className="bg-white rounded p-5 shadow w-full">
        <div className="animate-fade">
          <div className="w-full my-5 gap-3 flex justify-between flex-wrap">
            <div className="gap-3 items-center flex flex-wrap justify-between w-full">
              <div className="flex gap-3 items-center relative">
                <input
                  name="find"
                  id="find"
                  onChange={handleFindChange}
                  type="text"
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-cyan-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="find"
                  className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyan-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Nombre del servicio
                </label>
              </div>
              <CreateServiceModal
                setServices={setServices}
              ></CreateServiceModal>
            </div>
          </div>
          {filteredServices == null ? (
            <Loader></Loader>
          ) : filteredServices.length >= 1 ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
              {filteredServices.map((service, i) => {
                return (
                  <CardService
                    setServices={setServices}
                    service={service}
                    deleteService={deleteService}
                    key={i}
                  ></CardService>
                );
              })}
            </div>
          ) : (
            <NoResults></NoResults>
          )}
        </div>
      </section>
    </div>
  );
};
