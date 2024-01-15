import React from "react";

export const Badges = ({ status }) => {

  switch (status) {

    case "Pendiente":
      return (
        <div className="px-2 py-1 text-xs border rounded border-cyan-100 bg-cyan-50 text-cyan-500 w-fit">
          <p>Pendiente</p>
        </div>
      );

    case "Completado":
      return (
        <div className="px-2 py-1 text-xs border rounded border-green-100 bg-green-50 text-green-500 w-fit">
          <p>Completado</p>
        </div>
      );

    default:
      return (
        <div className="px-2 py-1 text-xs border rounded border-cyan-100 bg-cyan-50 text-cyan-500 w-fit">
          <p>{status}</p>
        </div>
      );
  }
};
