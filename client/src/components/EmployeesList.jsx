import React from "react";
import { CardEmployee } from "./CardEmployee";

export const EmployeesList = ({ employees, filter, filterType }) => {
  const filteredEmployees = () => {
    if (filter == null) {
      return employees;
    } else {
      console.log(employees);
      switch (filterType) {
        case "name":
          return employees.filter((item) => item.nombre.toLowerCase().includes(filter.toLowerCase()));
        case "cargo":
          return employees.filter((item) => item.cargo.toLowerCase().includes(filter.toLowerCase()));
        default:
          return employees;
      }
    }
  };

  return (
    <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
      {filteredEmployees().map((employee, i = 0) => (
        <CardEmployee key={i++} employee={employee}></CardEmployee>
      ))}
    </div>
  );
};
