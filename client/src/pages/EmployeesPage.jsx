import React, { useState, useEffect, useMemo } from "react";
import { useParams, Outlet } from "react-router-dom";
import { BoxEmployee } from "../components/BoxEmployee";
import { Loader } from "../components/Loader";
import { NoResults } from "../components/NoResults";
import axios from "axios";

export const EmployeesPage = () => {
  const { id } = useParams();

  const [employees, setEmployees] = useState(null);
  const [role, setRole] = useState("All");
  const [finded, setFinded] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/empleados`).then((response) => {
      if (
        response.status >= 200 &&
        response.status <= 299 &&
        !response.data.message
      ) {
        setEmployees(response.data);
      } else {
        setEmployees([]);
      }
    });
  }, []);

  const filteredEmployees = useMemo(() => {
    return role !== "All"
      ? employees.filter((emp) => {
          return emp.cargo == role;
        })
      : employees;
  }, [employees, role]);

  const findedEmployees = useMemo(() => {
    return finded !== null
      ? filteredEmployees.filter((emp) => {
          return emp.nombre.toLowerCase().startsWith(finded.toLowerCase());
        })
      : employees;
  }, [filteredEmployees, finded]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleFindChange = (e) => {
    e.target.value == "" ? setFinded(null) : setFinded(e.target.value);
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
            d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            clipRule="evenodd"
          />
          <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
        </svg>
        <span>Empleados</span>
      </h1>
      <section className="bg-white rounded p-5 shadow w-full">
        {id ? (
          <Outlet></Outlet>
        ) : (
          <div className="animate-fade">
            <div className="w-full my-5 gap-3 flex justify-between flex-wrap">
              <div className="gap-3 items-center flex flex-wrap">
                <div className="flex gap-3 items-center">
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
                      Nombre del empleado
                    </label>
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      onChange={handleRoleChange}
                      value="All"
                      type="radio"
                      name="role"
                      id="Todos"
                      defaultChecked
                      className="bg-white checked:bg-cyan-500 text-cyan-600 focus:ring-white duration-200"
                    />
                    <label htmlFor="" className="text-sm">
                      Todos
                    </label>
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      onChange={handleRoleChange}
                      value="Administrador"
                      type="radio"
                      name="role"
                      id="Administrador"
                      className="bg-white checked:bg-cyan-500 text-cyan-600 focus:ring-white duration-200"
                    />
                    <label htmlFor="" className="text-sm">
                      Administrador
                    </label>
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      onChange={handleRoleChange}
                      value="Fisioterapeuta"
                      type="radio"
                      name="role"
                      id="Fisioterapeuta"
                      className="bg-white checked:bg-cyan-500 text-cyan-600 focus:ring-white duration-200"
                    />
                    <label htmlFor="Fisioterapeuta" className="text-sm">
                      Fisioterapeuta
                    </label>
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      onChange={handleRoleChange}
                      value="Auxiliar"
                      type="radio"
                      name="role"
                      id="Auxiliar"
                      className="bg-white checked:bg-cyan-500 text-cyan-600 focus:ring-white duration-200"
                    />
                    <label htmlFor="Auxiliar" className="text-sm">
                      Auxiliar
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {findedEmployees == null ? (
              <Loader></Loader>
            ) : findedEmployees.length >= 1 ? (
              <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2">
                {findedEmployees.map((employee, i) => {
                  return (
                    <BoxEmployee employee={employee} key={i}></BoxEmployee>
                  );
                })}
              </div>
            ) : (
              <NoResults></NoResults>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
